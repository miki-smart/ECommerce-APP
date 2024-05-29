import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ PaginationModule} from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './component/pagination-header/pagination-header.component';
import { SharedpaginationComponent } from './component/sharedpagination/sharedpagination.component';
import { OrderTotalComponent } from './component/order-total/order-total.component';


@NgModule({
  declarations: [
    
    PaginationHeaderComponent,
    SharedpaginationComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [PaginationModule,PaginationHeaderComponent,SharedpaginationComponent,OrderTotalComponent]
})
export class SharedModule { }
