import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrl: './pagination-header.component.css'
})
export class PaginationHeaderComponent {
@Input() totalCount:number;
@Input() pageSize:number;
@Input() pageIndex:number;
}
