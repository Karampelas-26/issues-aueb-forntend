import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CreateUser } from 'src/app/interface/CreateUser';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private committee: CommitteeService, private snackBar: MatSnackBar, private formBuilder: FormBuilder){}
  
  createUser: CreateUser = {
    email: '',
    phone: '',
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    role: '',
    technicianTeam: ''
  };


  selectedFile!: File;

  ngOnInit(): void {  }

  onCreate() {
    this.committee.createUser(this.createUser).subscribe({
      next: (res: any) => {
        this.clearUserCreate();
        this.openSnackbar('Success: ' + res.message, 'success-snackbar');
        console.log(res);
      },
      error: (err) => {
        this.openSnackbar('Error: ' + err.error.message, 'error-snackbar');
        console.error(err.error.message);
      }
    })
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.committee.uploadUsersCSV(formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.openSnackbar('Success: ' + res.message, 'success-snackbar');
      },
      error: (err) => {
        this.openSnackbar('Error: ' + err.error.message, 'error-snackbar');
        console.error(err.error.message);
      }
    })
  }


  openSnackbar(message: string, panelClass: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: [panelClass]
    };
    this.snackBar.open(message, 'Close', config);
  }

  clearUserCreate(){
    this.createUser.firstname = '';
    this.createUser.lastname = '';
    this.createUser.email = '';
    this.createUser.phone = '';
    this.createUser.address = '';
    this.createUser.gender = '';
    this.createUser.role = '';
    this.createUser.technicianTeam = '';
  }

}


