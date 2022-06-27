import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import {User} from '../user';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

// pagination view child of ng bootstrap element

page = 1;
pageSize = 2;
collectionSize: number;

config: any;



  userList: User[] = [
    {
      id: 1,
      name: 'Ganesh',
      email: 'raju@gmail.com',
      phone: '9615212999',
    },
    {
      id: 2,
      name: 'Ganeshchinimilli',
      email: 'gun@gmail.com',
      phone: '9615212998',
    },
    {
      id: 3,
      name: 'nitesh',
      email: 'nitesh@gmail.com',
      phone: '9615212998',
    },
    {
      id: 4,
      name: 'saiteja',
      email: 'saiteja@gmail.com',
      phone: '9615212998',
    },
    {
      id: 5,
      name: 'raju',
      email: 'raju@gmail.com',
      phone: '9615212998',
    },
  ];

  paginate:[]|any;




  constructor(

    private modalService: NgbModal,
  ) {

    this.collectionSize = this.userList.length;
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: 1,
      totalItems: this.collectionSize    };

   }

  ngOnInit(): void {
  }


  openFormModal() {
    const modalRef = this.modalService.open( FormComponent);
    modalRef.componentInstance.emitService.subscribe((user:User) => {

        let id = this.userList.length + 1;
        user.id = id;
        this.userList.push(user);
        console.log(user);
    });
  }
  Editformmodal(user:User) {
    const modalRef = this.modalService.open( FormComponent);
    modalRef.componentInstance.id = user.id;
    modalRef.componentInstance.name = user.name;
    modalRef.componentInstance.email = user.email;
    modalRef.componentInstance.phone = user.phone;
    modalRef.componentInstance.emitService.subscribe((user:User) => {
           let index = this.userList.findIndex(x => x.id == user.id);
      this.userList[index] = user;
    });
  }
  deleteUser(index:number) {
    this.userList.splice(index,1);

  }

  doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList = this.userList.filter(user => user.name.toLowerCase().indexOf(filterValue.toLowerCase()) === 0);
  };
pageChanged(event:number):void{
  this.config.currentPage = event;

}















}
