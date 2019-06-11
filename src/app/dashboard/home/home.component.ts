import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../providers/account.service';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Credit } from '../../models/credit';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private users : User[];
  private user : User;
  private balance : number;
  public credits: Credit[];
  public headers : any;

  constructor(private router: Router,
              private account : AccountService,
              private modalService: NgbModal) { 
    this.user = this.account.getDecodedAccessToken().user; 
    this.balance = environment.amount;
  }

  ngOnInit() {
     this.account.getBalance().subscribe(  res  =>  this.balance = res.data[0].balance )
     this.getCredits();
     this.getUsers();
  }

  getCredits(){
    this.account.handleCredits()
      .subscribe(res => {
        this.credits = res.data;
          this.headers = [
            {
                name :"Usuario"
            },
            {
              name: "Valor Solicitado"
            }, 
            {
              name: "Estado"
            }, 
            {
              name: "Numero de pagos"
            }, 
          ]  
      });

  }

  getUsers(){
    this.account.handleUsers()
      .subscribe(res => {
        this.users = res.data;
      });
  }


  solicitarPrestamo(id, name) {
    
    let user = { id, name};
    const modalRef = this.modalService.open(ModalContentComponent, { backdropClass: 'light-blue-backdrop' });
    modalRef.componentInstance.user = user;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
 
}
