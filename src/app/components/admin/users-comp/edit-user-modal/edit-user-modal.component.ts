import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  private originalData!: User;
  constructor(private dialogRef: MatDialogRef<EditUserModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    this.originalData = this.data;
  }

  saveData():void {
    this.dialogRef.close({data: this.data, saveData: true});
  }

  closeDialog():void {
    this.dialogRef.close({saveData: false})
  }

}
