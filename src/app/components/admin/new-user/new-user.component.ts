import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  // products: any = [];

  // constructor(private httpCLient: httpCLient){}
  csvForm = document.getElementById('csv-files') as HTMLFormElement;
  csvFiles = document.getElementById('csv-input') as HTMLInputElement;

  ngOnInit(): void {  }
  
  openLocalFiles() {
    
  }
}


