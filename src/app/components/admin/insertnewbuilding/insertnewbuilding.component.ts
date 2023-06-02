import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insertnewbuilding',
  templateUrl: './insertnewbuilding.component.html',
  styleUrls: ['./insertnewbuilding.component.css']
})
export class InsertnewbuildingComponent {
  constructor(public dialogRef: MatDialogRef<InsertnewbuildingComponent>) {}
}
