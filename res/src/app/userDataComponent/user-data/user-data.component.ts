import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/objects/Client/client';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, OnChanges {

  @Input()
  user: Client;

  
  nameFormControl: FormControl;
  surnameFormControl: FormControl;
  streetFormControl: FormControl;
  numberFormControl: FormControl;
  secondNumberFormControl: FormControl;
  postCodeFormControl: FormControl;
  phoneNumberFormControl: FormControl;
  cardNumberFormControl: FormControl;
  constructor(private afCloud: AngularFirestore) { }

  ngOnChanges(changes: SimpleChanges){
      let newUser: Client = changes["user"].currentValue;
      this.nameFormControl = new FormControl(newUser != undefined ? newUser.name : '', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]);
      this.surnameFormControl = new FormControl(newUser != undefined ? newUser.surname : '', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]);
      this.streetFormControl = new FormControl(newUser != undefined ? newUser.street : '', [Validators.required,, Validators.minLength(2), Validators.maxLength(50)]);
      this.numberFormControl = new FormControl(newUser != undefined ? newUser.number : '', [Validators.required,Validators.maxLength(10)]);
      this.secondNumberFormControl = new FormControl(newUser != undefined ? newUser.secondNumber : '',Validators.maxLength(10));
      this.postCodeFormControl = new FormControl(newUser != undefined ? newUser.postcode : '', [Validators.required,Validators.pattern("^\\d\\d-\\d\\d\\d$")]);
      this.phoneNumberFormControl = new FormControl(newUser != undefined ? newUser.phoneNumber : '', [Validators.required,Validators.pattern("^\\d{9}$")]);
      this.cardNumberFormControl = new FormControl(newUser != undefined ? newUser.cardNumber : '',Validators.pattern("^\\d{4}-\\d{4}-\\d{4}-\\d{4}$"));
  }
  
  updateUser(prop: string, formControl: FormControl){
    if(formControl.valid){
      let data = {};
      data[prop] = formControl.value;
      this.afCloud.collection("clients").doc(this.user.ID).update(data);
    }
  }

  ngOnInit(): void {
    
  }


  

}
