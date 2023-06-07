import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddfloorComponent } from '../addfloor/addfloor.component';
import { CreateBuilding } from 'src/app/interface/create-building';
import { CreateSites } from 'src/app/interface/create-sites';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-insertnewbuilding',
  templateUrl: './insertnewbuilding.component.html',
  styleUrls: ['./insertnewbuilding.component.css']
})
export class InsertnewbuildingComponent{
  constructor(public dialogRef: MatDialogRef<InsertnewbuildingComponent>,private committee: CommitteeService) {}
  
  floors:any[] = [];
  
  
  values:any[] = [];
  noOfSites:number = 1;

  CreateBuildingForm: CreateBuilding = {
    name:'',
    address:'',
    floors:`${this.floors.length}`
  }
  createSiteForm: CreateSites = {
    name:'',
    floor:'',
    building:this.CreateBuildingForm
  }
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
    this.createSiteForm.floor = '${y}';
  }

  completeAddingBuilding(){
    console.log(this.createSiteForm);
    this.committee.createSite(this.createSiteForm).subscribe({
      next:(res) =>{
        console.log(res);
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }
}
