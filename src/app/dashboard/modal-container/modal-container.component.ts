import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.sass']
})
export class ModalContainerComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    
  }

  close(){
    this.modalService.dismissAll();
  }



}
