import {Component, Inject, OnInit} from '@angular/core';
import {CommitteeService} from "../../../../services/committee.service";
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-equipment-to-site-modal',
  templateUrl: './add-equipment-to-site-modal.component.html',
  styleUrls: ['./add-equipment-to-site-modal.component.css']
})
export class AddEquipmentToSiteModalComponent implements OnInit{

  sitesName: string[] | undefined = [];
  buildingNames: Map<string, string[]> = new Map<string, string[]>();

  buildingNamesByEquipment: Map<string, string[]> = new Map<string, string[]>();
  sites = new FormControl(['']);
  uncheckedSites: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private committee: CommitteeService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.committee.getBuildingsSitesName().subscribe({
      next: (value: any) => {
        // Transform the response into a Map
        this.buildingNames = new Map<string, string[]>();
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            this.buildingNames.set(key, value[key]);
          }
        }
      },
      error: err => console.error(err)
    });
  }

  onOptionSelected(event: MatSelectChange) {
    this.sitesName = this.buildingNames.get(event.value.toString())
    this.committee.getBuildingsSitesWithEquipmentType(this.data.typeOfEquipment).subscribe({
      next: (value: any) => {
        this.buildingNamesByEquipment = new Map<string, string[]>();
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            this.buildingNamesByEquipment.set(key, value[key]);
          }
        }
        let arr = this.buildingNamesByEquipment.get(event.value.toString());
        if(arr) {
          this.sites.setValue(arr)
        }
      }
    })
  }

  onSave() {
    console.log(this.data)
    if (this.sitesName) {
      // Get unchecked sites by comparing selected values with available site names
      this.uncheckedSites = this.sitesName.filter(site => !this.sites.value?.includes(site));
      this.committee.deleteEquipmentInSites(this.data.id, this.uncheckedSites).subscribe({
        next: (value: any) => console.log(value.message),
        error: err => console.error(err)
      })
      this.committee.addEquipmentInSites(this.data.id, this.sites.value).subscribe({
        next: (value: any) => console.log(value.message),
        error: err => console.error(err)
      })

    } else {
      console.log('No site names available.');
    }
  }

  onClose() {

  }
}
