
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InsertnewbuildingComponent } from '../insertnewbuilding/insertnewbuilding.component';
import { CommitteeService } from 'src/app/services/committee.service';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit{
  constructor(public dialog: MatDialog,private committee: CommitteeService) {}
  
  panelOpenState = false;

  request:any[]=[];

  
  ngOnInit(){
    this.committee.getBuilding().subscribe({
      next:(res:any) =>{
        console.log("building");
        for(const key in res){
          this.request.push(res[key]);
        }
        
        console.log(this.request);
      },
      error: (err) =>{
        console.error(err.error.message);
      }
    })
  }

  counter(i:any){
    return new Array(i);
  }

  checkIf(i:any,b:any) {
    if(i === b){
      return true;
    }
    return false;
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InsertnewbuildingComponent , {
      width: '800px',
      height:'700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
