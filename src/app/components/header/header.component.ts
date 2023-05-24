import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status:boolean) => {
      this.isLoggedIn = status
    });
  }

  logOut() {
    this.authService.setLoggedInStatus(false);
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
