import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee';

import * as XLSX from 'xlsx';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  i: number = 0;

  fileName = 'ExcelSheet.xlsx';
  dataSource: any = new MatTableDataSource<Employee>([]);
  userList: Employee[] = [
    {
      id: 1,
      name: 'Ganesh',
      email: 'raju@gmail.com',
      mobile: '9615212999',
    },
    {
      id: 2,
      name: 'Ganeshchinimilli',
      email: 'gun@gmail.com',
      mobile: '9615212998',
    },
    {
      id: 3,
      name: 'nitesh',
      email: 'nitesh@gmail.com',
      mobile: '9615212998',
    },
    {
      id: 4,
      name: 'saiteja',
      email: 'saiteja@gmail.com',
      mobile: '9615212998',
    },
    {
      id: 5,
      name: 'raju',
      email: 'raju@gmail.com',
      mobile: '9615212998',
    },
  ];
  addUserForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const PAT_NAME = '^[a-zA-Z ]{2,20}$';
    const PAT_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';
    const PAT_MOBILE = '^[0-9]{10}$';
    this.addUserForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      mobile: ['', [Validators.required, Validators.pattern(PAT_MOBILE)]],
    });
  }

  @ViewChild('pagination', { static: false }) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  ngOnInit(): void {
    this.getdata();
  }
  getdata(): void {
    this.dataSource = new MatTableDataSource<Employee>(this.userList);
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'action'];
  submit(): void {
    //check if the id is already present in the list
    if (this.addUserForm.valid) {
      if (this.addUserForm.value.id == 0) {
        this.addUserForm.value.id = this.userList.length + 1;
        this.userList.push(this.addUserForm.value);
        this.getdata();
        this.toggleDisplayDiv();
      } else {
        this.userList[this.addUserForm.value.id - 1] = this.addUserForm.value;
        console.log(this.userList);
        this.getdata();
        this.toggleDisplayDiv();
      }
    } else {
    }
  }
  isShowDiv = true;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  remove(id: number) {
    this.userList = this.userList.filter((x) => x.id != id);
    this.dataSource = new MatTableDataSource<Employee>(this.userList);
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  updateuser(id: number) {
    this.addUserForm.patchValue({
      id: id,
      name: this.userList[id - 1].name,
      email: this.userList[id - 1].email,
      mobile: this.userList[id - 1].mobile,
    });
    this.toggleDisplayDiv();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  };
  doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('ganesh');
    console.log(element);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // delete action column
    const ws_with_cols: XLSX.WorkSheet = XLSX.utils.sheet_add_json(
      ws,
      this.userList,
      {
        header: ['id', 'name', 'email', 'mobile'],
        skipHeader: true,
        origin: -1,
      }
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws_with_cols, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
