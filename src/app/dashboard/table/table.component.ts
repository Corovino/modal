import { Component, PipeTransform, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { AccountService } from '../../providers/account.service';
import { Credit } from '../../models/credit';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() headers: any;
  @Input() data:any;
  public credits: Credit[];
  public searchTerm: string;
  
  constructor(private account: AccountService) {   
  }

  

  ngOnInit() {
    

  }

}
