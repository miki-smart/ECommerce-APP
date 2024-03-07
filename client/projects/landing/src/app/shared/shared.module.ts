import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ PaginationModule} from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './component/pagination-header/pagination-header.component';
import { SharedpaginationComponent } from './component/sharedpagination/sharedpagination.component';


@NgModule({
  declarations: [
    
    PaginationHeaderComponent,
    SharedpaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [PaginationModule,PaginationHeaderComponent,SharedpaginationComponent]
})
export class SharedModule { }
