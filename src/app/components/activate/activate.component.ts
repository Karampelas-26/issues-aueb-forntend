import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivateAccount } from 'src/app/interface/ActivateAccount';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { passwordStrengthValidator } from 'src/app/util/strength.validator';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit{

  hide = true;
  verifyHide = true;
  verifyPassword = '';
  
  activationAccount: ActivateAccount = {
    activationToken: '',
    password: ''
  }
  isLoggedIn!: boolean;

  passwordForm!: FormGroup;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute){
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.token);
      this.activationAccount.activationToken = params.token;
    });

  }

  ngOnInit(): void {

    this.isLoggedIn = this.auth.getLoggedIn();
    console.log("this is in ngoninit: " + this.isLoggedIn)

    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    })
    if(this.isLoggedIn) {
      this.auth.redirectUser();
    }
  }

  onActivateAccount(){
    if(this.activationAccount.password === this.verifyPassword) {
      this.auth.activateUser(this.activationAccount).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error(err);
          
        }
      })
    }

  }


}
