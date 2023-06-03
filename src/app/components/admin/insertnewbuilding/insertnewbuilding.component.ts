import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddfloorComponent } from '../addfloor/addfloor.component';

@Component({
  selector: 'app-insertnewbuilding',
  templateUrl: './insertnewbuilding.component.html',
  styleUrls: ['./insertnewbuilding.component.css']
})
export class InsertnewbuildingComponent{
  constructor(public dialogRef: MatDialogRef<InsertnewbuildingComponent>) {}
  
  floors:any[] = [];
  
  
  values:any[] = [];
  noOfSites:number = 1;
  ngOninit(){
  
  }

  counter(i:any){
    return new Array(i);
  }
  removeValue(i:any,y:any){
    this.noOfSites--;
    if(this.noOfSites<0){
      this.noOfSites = 0;
    }
    this.floors[y] = this.noOfSites;
    if(this.noOfSites === 0){
      this.floors.pop();
    }
  }

  createfloorComponent(){
    if(this.noOfSites != 1){
      this.noOfSites = 1;
    }
    this.floors.push(this.noOfSites);
    console.log(this.floors);
  }

  handleKeyUp(y:number){
    this.noOfSites++;
    this.floors[y] = this.noOfSites;
  }

  completeAddingBuilding(){
    
  }
}
