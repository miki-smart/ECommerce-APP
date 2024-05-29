import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-servererror',
  templateUrl: './servererror.component.html',
  styleUrl: './servererror.component.css'
})
export class ServererrorComponent {
error:any;
constructor(private router:Router) { 
  const navigation = this.router.getCurrentNavigation();
  this.error = navigation?.extras?.state?.error;
  console.log(this.error);
}
}
