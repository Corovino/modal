import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../providers/message.service';
import { AccountService } from '../../../providers/account.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  btnDisabled = false;
  constructor(private dialog : MessageService,
              private rest: AccountService,
              private router: Router,
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.dialog.error('Password is not entered');
      }
    } else {
      this.dialog.error('Email is not entered.');
    }
  }

   login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data =  this.rest.post(
          {
            email: this.email,
            password: this.password,
          },
        );
         data.subscribe( res => {
          console.log(res);
          if (res.success) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.dialog.error(['message']);
          } 
        })
      }
    } catch (error) {
      this.dialog.error(error);
    }
    this.btnDisabled = false;
  }

}
