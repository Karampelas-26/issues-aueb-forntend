import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Equipment } from 'src/app/interface/Equipment';
import { CreateEquipment } from 'src/app/interface/create-equipment';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-add-equipment-modal',
  templateUrl: './add-equipment-modal.component.html',
  styleUrls: ['./add-equipment-modal.component.css']
})
export class AddEquipmentModalComponent implements OnInit{
  createEquipmentForm1: FormGroup;
  typeOfEquipment: FormControl;
  siteNameoption:FormControl;

  constructor(private committeeService:CommitteeService,private formBuilder: FormBuilder){
    this.typeOfEquipment = new FormControl('');
    this.siteNameoption = new FormControl('');
    this.createEquipmentForm1 = this.formBuilder.group({
      siteName:this.siteNameoption
    });
  }
  
  createEquipmentForm: CreateEquipment = {
    typeOfEquipment: "",
    siteName:""
  };

  

  
  buildingSitesNames!: Map<string, string[]>;
  value = '';
  filter = 'filters'
  autoCompleteForm = new FormControl();
  selectedBuilding = '';
  buildings: string[] = [];
  options: string[] = [];
  filteredOptions!: Observable<string[]>;


  ngOnInit(): void {
    this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

    this.committeeService.getAllSitesNames().subscribe({
      next: (res: any) => {
        this.options = res;
      },
      error: err => console.error(err)
    });

    this.committeeService.getBuildingsName().subscribe({
        next: (res: any) => {
          this.buildings = res;
        },
        error: err => console.error(err)
      });

    this.committeeService.getBuildingsSitesName().subscribe({
      next: (res: any) => this.buildingSitesNames = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })  
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  onBuildingSelected(building: string): void {
    if (this.buildingSitesNames.has(building)) {
      this.options = this.buildingSitesNames.get(building) || [];
      this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '')),
      );
    } else {
      this.options = [];
    }
  }

  onAddEquipment(){
    const sitename:string=this.createEquipmentForm1.get('siteName')?.value;
    this.createEquipmentForm.siteName = sitename;
    console.log(sitename);
    console.log(this.createEquipmentForm);
    this.committeeService.createEquipment(this.createEquipmentForm).subscribe({
      next:(res) =>{
        console.log(res);
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }
}
