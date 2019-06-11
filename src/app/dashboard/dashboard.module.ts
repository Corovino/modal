import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from "rxjs";
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CreditFilterPipe } from '../pipes/credit-filter.pipe';
import { CreateUserComponent } from './create-user/create-user.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { MessageComponent } from '../components/message/message.component';





@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    CreditFilterPipe,
    CreateUserComponent,
    ModalContainerComponent,
    ModalContentComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    NgbModule
  ],
  entryComponents: [ModalContentComponent]
})
export class DashboardModule { }
