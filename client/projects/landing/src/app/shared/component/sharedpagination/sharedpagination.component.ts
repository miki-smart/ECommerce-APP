
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { PaginationComponent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-sharedpagination',
  templateUrl: './sharedpagination.component.html',
  styleUrl: './sharedpagination.component.css'
})
export class SharedpaginationComponent {
@Input() totalCount:number;
@Input() pageSizeSelected:number;
@Output() pageIndexSelected=new EventEmitter<number>();
onPageChanged(event){
  this.pageIndexSelected.emit(event.page);
}

}
