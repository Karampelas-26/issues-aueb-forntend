import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-delete-modal',
  templateUrl: './verify-delete-modal.component.html',
  styleUrls: ['./verify-delete-modal.component.css']
})
export class VerifyDeleteModalComponent {

  constructor(private dialogRef: MatDialogRef<VerifyDeleteModalComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false); // User canceled, do not proceed
  }

  onYesClick(): void {
    this.dialogRef.close(true); // User confirmed, proceed
  }

}
