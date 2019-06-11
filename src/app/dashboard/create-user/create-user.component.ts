import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../providers/message.service';
import { AccountService } from '../../providers/account.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  password1 = '';
  number_id = '';

  btnDisabled = false;

  constructor(
    private dialog: MessageService,
    private rest: AccountService,
    private router: Router,
  ) { }

  ngOnInit() { }

  validate() {


    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.dialog.error('Las contraseñas no coninciden.');
            }
          } else {
            this.dialog.error('La confirmación de contraseña no fue ingresada');
          }
        } else {
          this.dialog.error('Debe ingresar una contraseña');
        }
      } else {
        this.dialog.error('Debe ingresar un correo.');
      }
    } else {
      this.dialog.error('Debe ingresar un nombre.');
    }
  }

  createUser() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
       this.rest.createUser(
          {
            name: this.name,
            email: this.email,
            password: this.password,
            number_id: this.number_id,
          },
        ).subscribe( res => {
            console.log(res);
            if(res.success){
               this.router.navigate(['/dashboard']);
            }  
        });
        
      }
    } catch (error) {
      console.log(error);
      
    }
    this.btnDisabled = false;
  }

}
