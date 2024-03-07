import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Toast, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
