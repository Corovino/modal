import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../providers/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor(private data: MessageService ) { }

  ngOnInit() {
  }

}
