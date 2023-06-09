import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(private dialogRef: MatDialogRef<DeleteModalComponent>){}
 
  onNoClick(): void {
    this.dialogRef.close(false); // User canceled, do not proceed
  }

  onYesClick(): void {
    this.dialogRef.close(true); // User confirmed, proceed
  }
  
}
