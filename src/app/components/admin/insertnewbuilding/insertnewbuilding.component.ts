import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateBuilding } from 'src/app/interface/Create-building';
import { CommitteeService } from 'src/app/services/committee.service';
import {CreateSites} from "../../../interface/Create-sites";

@Component({
  selector: 'app-insertnewbuilding',
  templateUrl: './insertnewbuilding.component.html',
  styleUrls: ['./insertnewbuilding.component.css']
})
export class InsertnewbuildingComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<InsertnewbuildingComponent>,private committee: CommitteeService) {}
  floor = 0;
  floors:any[] = [];
  buildingName = '';
  buildingAddress = '';
  siteOnFlors: Map<number, string[]> = new Map<number, string[]>();

  values:any[] = [];
  noOfSites:number = 1;

  createBuildingForm: CreateBuilding = {
    name: "",
    address: "",
    floors: "",
    sites: []
  };
  ngOnInit(): void {
  }

  counter(i:any){
    return new Array(i);
  }
  removeValue(floor: number, siteName: string){
    if (this.siteOnFlors.has(floor)) {
      const sites: string[] | undefined = this.siteOnFlors.get(floor);

      if (sites) {
        const updatedSites = sites.filter(site => site !== siteName);
        this.siteOnFlors.set(floor, updatedSites);
      }
    }
    // this.noOfSites--;
    // if(this.noOfSites<0){
    //   this.noOfSites = 0;
    // }
    // this.floors[y] = this.noOfSites;
    // if(this.noOfSites === 0){
    //   this.floors.pop();
    // }
  }

  createfloorComponent(){
    this.siteOnFlors.set(this.floor, [])
    this.floor++;
    // if(this.noOfSites != 1){
    //   this.noOfSites = 1;
    // }
    // this.floors.push(this.noOfSites);
    // console.log(this.floors);
  }

  handleKeyUp(y:number){
    this.noOfSites++;
    this.floors[y] = this.noOfSites;
  }

  onAddSite(floor: number, siteName: string) {
    if(this.siteOnFlors.has(floor)){
      this.siteOnFlors.get(floor)?.push(siteName);
    }
    else {
      this.siteOnFlors.set(floor, [siteName]);
    }
    console.log(this.siteOnFlors)

    // this.handleKeyUp(y);
    // console.log(siteName)
  }

  completeAddingBuilding(){
    console.log(this.siteOnFlors)

    let sites: CreateSites[] = [];
    for(let [key, value] of this.siteOnFlors.entries()){
      for(let sitename of value) {
        sites.push( {
          name: sitename,
          floor: (key+1).toString()
        })
      }
    }

    this.createBuildingForm.name = this.buildingName;
    this.createBuildingForm.address = this.buildingAddress;
    this.createBuildingForm.floors = String(this.siteOnFlors.size);
    this.createBuildingForm.sites = sites;
    console.log(this.createBuildingForm)
    this.committee.createSite(this.createBuildingForm).subscribe({
      next:(res) =>{
        console.log(res);
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }


}
