import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../providers/message.service';
import { AccountService } from '../../providers/account.service';




@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.sass']
})
export class ModalContentComponent implements OnInit {

  private name   : string;
  private requested_value : string ;
  private date_to_pay   : string;
  private credit_user: any;

  @Input() public user;
  constructor(private modalService: NgbModal,
              private dialog : MessageService,
              private credit : AccountService
  ) { }

  ngOnInit() { 
      this.name = this.user.name;    
  }

  getLoan(){

    if(this.validate()){
      console.log(this.getRandom())
      if (this.getRandom() == 0) {

         this.credit.handleStatusCredit(this.user.id)
         .subscribe( res => {
           
              if(!res.data || res.data.length <= 0){
                this.credit_user = {
                    user_id : this.user.id,
                    balance: "0",
                    requested_value: this.requested_value,
                    state:'rechazado',
                    date_to_pay:this.date_to_pay,
                    paid_out:false
                }
                this.credit.createCreditToUser(this.credit_user)
                  .subscribe(res => {
                    if (res.success) {
                      alert("Usted no puede solicitar un credito")
                      setTimeout(() => { this.close() }, 30000);
                    } else {
                      alert("Comuniquese con el administrador del sistema");
                    }
                  });
              }
         })
         
      }else{

         this.credit.handleStatusCredit(this.user.id)
         .subscribe( res => {
                  if(res.data){
                      this.credit_user = {
                        user_id: this.user.id,
                        balance: this.requested_value,
                        requested_value: this.requested_value,
                        state: 'aprobado',
                        date_to_pay: this.date_to_pay,
                        paid_out: false
                       } 

                       this.credit.getBalance().subscribe( res => {
                           let balance = parseInt(res.data[0].balance) - parseInt(this.requested_value);
                           this.credit.updateBalance({ _id:"5cdb8055ad176a118a7dd336", balance: balance })
                           .subscribe( res => console.log(res) );
                       })

                        this.credit.createCreditToUser(this.credit_user)
                        .subscribe( res => {
                              if (res.success) {
                                this.dialog.success("Credito Aprobado");
                              } else {
                                this.dialog.error("Comuniquese con el administrador del sistema");
                              } 
                        });
                  }else{
                    alert("Usted no puede solicitar un credito");
                  }
         })
      } 
    }else{
      this.dialog.error("Todos los campos deben estar llenos");
    }

  }

  getRandom(){
    return Math.round(Math.random());
  }

  validate() {
    if (this.name) {
      if (this.requested_value) {
        if (this.date_to_pay) {
           return true;
        } else {
          this.dialog.error('Debe ingresar numero de cuotas a pagar');
        }
      } else {
        this.dialog.error('Debe ingresar un el monto solicitado.');
      }
    } else {
      this.dialog.error('Debe ingresar nombre del usuario.');
    }
  }

  

  close() {
    this.modalService.dismissAll();
  }

}
