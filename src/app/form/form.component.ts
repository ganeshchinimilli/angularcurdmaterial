import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // @Input() id: [] | undefined;
  // @Input() name: string| undefined;
  // @Input() email: string| undefined;
  // @Input() phone: string| undefined;


  // @Input() user:[]|any;

  @Input() id:number=0;

  @Input() name:string='';

  @Input() email:string='';

  @Input() phone:string='';

  @Output() emitService = new EventEmitter();



  myForm: FormGroup|any;
  constructor(
    public activeModal: NgbActiveModal,

   private formBuilder: FormBuilder) {this.createForm(); }
   createForm() {
    const PAT_NAME = '^[a-zA-Z ]{2,20}$';
    const PAT_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';
    const PAT_MOBILE = '^[0-9]{10}$';
    this.myForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      phone: ['', [Validators.required, Validators.pattern(PAT_MOBILE)]],

    });
  }
  submitForm(): void{
    if(this.myForm.valid){
    const id = this.myForm.get('id').value;
    const name = this.myForm.get('name').value;
    const email = this.myForm.get('email').value;
    const phone = this.myForm.get('phone').value;
    const user = {
      id:id,
      name:name,
      email:email,
      phone:phone,
    }
    console.log(user);
    this.emitService.emit(user);
    this.activeModal.close('Modal Closed');
  }else{
    this.myForm.markAllAsTouched();



  }
}
  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
