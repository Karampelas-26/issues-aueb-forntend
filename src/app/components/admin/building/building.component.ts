import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InsertnewbuildingComponent } from '../insertnewbuilding/insertnewbuilding.component';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {
  constructor(public dialog: MatDialog) {}
  
  panelOpenState = false;
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InsertnewbuildingComponent , {
      width: '500px',
      height:'500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
