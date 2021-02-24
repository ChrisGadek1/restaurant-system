import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/objects/Client/client';
import { DialogComponent } from 'src/app/registerComponent/dialogComponent/dialog/dialog.component'
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder, private afStorage: AngularFirestore, private auth: AngularFireAuth, public dialog: MatDialog, private router: Router) { }

  comparePasswords(){
    return(form: FormGroup) => {
      let pass1Control = form.get("password1");
      let pass2Control = form.get("password2");
      if(pass1Control.value !== pass2Control.value){
        pass2Control.setErrors({ mustMatch: true });
      }
      else{
        pass2Control.setErrors(null);
      }
    }
  }

  emailExists = (control: AbstractControl) =>{
    console.log("test");
    return this.afStorage.collection("/clients", ref => ref.where("email", "==", control.value)).get().pipe(
      map(users => {
        console.log(users.docs);
        if(users.docs.length > 0) return {emailExists: true};
        else return null;
      }), take(1)
    );
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      secondNumber: ['', Validators.maxLength(10)],
      postCode: ['', [Validators.required, Validators.pattern("^\\d\\d-\\d\\d\\d$")]],
      email: ['',[Validators.required, Validators.email], this.emailExists.bind(this)],
      password1: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(40), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)]],
      password2: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      creditCard: ['',Validators.pattern("^\\d{4}-\\d{4}-\\d{4}-\\d{4}$")]
    },{
      validator: this.comparePasswords()
    });

    this.registerForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged(); // ustawiamy początkowany stan walidacji
  }

  formErrors = {
    name: '',
    surname: '',
    street: '',
    number: '',
    secondNumber: '',
    postCode: '',
    email: '',
    password1: '',
    password2: '',
    phone: '',
    creditCard: ''
  }
   
  private validationMessages = {
    name: {
      required: 'to pole jest obowiązkowe',
      minlength: 'imię musi mieć minimum 2 litery',
      maxlength: 'imię może mieć maksymalnie 50 liter'
    },
    surname: {
      required: 'to pole jest obowiązkowe',
      minlength: 'nazwisko musi mieć minimum 2 litery',
      maxlength: 'nazwisko może mieć maksymalnie 50 liter'
    },
    street:{
      required: 'to pole jest obowiązkowe',
      minlength: 'ulica musi mieć minimum 2 litery',
      maxlength: 'ulica może mieć maksymalnie 50 liter'
    },
    number:{
      required: 'to pole jest obowiązkowe',
      maxlength: 'numer może mieć maksymalnie 50 liter'
    },
    secondNumber : {
      maxlength: 'numer może mieć maksymalnie 50 liter'
    },
    postCode:{
      required: 'to pole jest obowiązkowe',
      pattern: 'kod pocztowy musi być postaci dd-ddd, d-cyfra'
    },
    email:{
      required: 'to pole jest obowiązkowe',
      email: 'wprowadź poprawny email',
      emailExists: 'istnieje już konto z podanym emailem'
    },
    password1:{
      required: 'to pole jest obowiązkowe',
      minlength: 'hasło musi mieć minimum 7 liter',
      maxlength: 'hasło może mieć maksymalnie 40 liter',
      pattern: 'hasło musi zawierać małe i duże litery, cyfry i znaki specjalne'
    },
    password2:{
      required: 'to pole jest obowiązkowe',
      mustMatch: 'hasła nie są takie same'
    },
    phone:{
      required: 'to pole jest obowiązkowe',
      pattern: 'numer telefonu musi składać się z 9 cyfr'
    },
    creditCard:{
      pattern: 'numer karty musi być postaci dddd-dddd-dddd-dddd, d-cyfra'
    }
  }

  onControlValueChanged() {
    const form = this.registerForm;
   
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field); 
   
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }

  register(registerForm: FormGroup){
    let newUser = new Client(
      registerForm.get("name").value,
      registerForm.get("surname").value,
      registerForm.get("email").value,
      registerForm.get("street").value,
      registerForm.get("number").value,
      registerForm.get("postCode").value,
      registerForm.get("phone").value
    );
    if(registerForm.get("secondNumber").value != ""){
      newUser.secondNumber = registerForm.get("secondNumber").value;
    }
    if(registerForm.get("creditCard").value != ""){
      newUser.cardNumber = registerForm.get("cardNumber").value;
    }
    newUser.ID = this.afStorage.createId();
    this.auth.createUserWithEmailAndPassword(newUser.email, registerForm.get("password1").value).then(() => {
      this.afStorage.collection("clients").doc(newUser.ID).set({...newUser}).then(() => {
        this.dialog.open(DialogComponent).afterClosed().toPromise().then(() => {
          this.router.navigate(['/']);          
        })
      })
    })
  }
}
