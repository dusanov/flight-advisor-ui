import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { D3Service } from '../d3.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication-service';

@Component({
  selector: 'map-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  constructor (private d3Service : D3Service,
              private router: Router,
              private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }              

  ngOnInit(): void {
  //  this.d3Service.drawSVG();
    this.d3Service.drawCanvas();
  }
}
