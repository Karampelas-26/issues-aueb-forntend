import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Equipment } from 'src/app/interface/Equipment';
import { CreateEquipment } from 'src/app/interface/create-equipment';
import { CommitteeService } from 'src/app/services/committee.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-equipment-modal',
  templateUrl: './add-equipment-modal.component.html',
  styleUrls: ['./add-equipment-modal.component.css']
})
export class AddEquipmentModalComponent implements OnInit{
  typeOfEquipment: string = '';

  constructor(private committeeService:CommitteeService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddEquipmentModalComponent>){
  }

  buildingSitesNames!: Map<string, string[]>;
  value = '';
  filter = 'filters'
  autoCompleteForm = new FormControl();
  selectedBuilding = '';
  buildings: string[] = [];
  options: string[] = [];
  filteredOptions!: Observable<string[]>;


  ngOnInit(): void {

  }

  onAddEquipment(){
    this.committeeService.createEquipment(this.typeOfEquipment).subscribe({
      next:(res: any) =>{
        console.log(res.message);
        this.dialogRef.close(true);
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }

  onClose(){
    this.dialogRef.close(false);
  }
}
