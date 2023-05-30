import { Component, OnInit } from '@angular/core';
import { CreateUser } from 'src/app/interface/CreateUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  // products: any = [];

  constructor(private committee: CommitteeService){}
  
  createUserForm: CreateUser = {
    email: 'kgiorgoks@gmail.com',
    phone: '59595',
    firstname: 'george',
    lastname: 'geoge',
    gender: 'M',
    address: 'adfsklj',
    role: 'ADMIN'
  };

  ngOnInit(): void {  }

  onCreate() {
    // console.log(this.createUserForm)
    // console.table(this.createUserForm)
    this.committee.createUser(this.createUserForm).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        
      }
    })
  }


}


