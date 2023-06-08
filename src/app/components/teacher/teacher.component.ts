import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  index = 0;

  issues = [
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "grey"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "red"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "grey"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "purple"
    },
    {
      class: "b32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "grey"
    },
    {
      class: "B32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "red"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "pink"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "purple"
    },
    {
      class: "C32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "blue"
    },
    {
      class: "C32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "red"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "yellow"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "grey"
    },
    {
      class: "A32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "aqua"
    },
    {
      class: "D32",
      issue: "Βλάβη προτζέκτορα",
      status: "Δημιουργήθηκε",
      color: "purple"
    },
  ]

  selectedIssues = this.issues.slice(this.index,this.index+7);

  buildingsWithSites: Map<string, string[]> = new Map<string, string[]>();
  buildingName = '';
  typeIssue = '';
  equipment = '';
  description = '';
  value = "";
  autoCompleteForm = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  equipments:any[] = [];
  issueTypes: string[] = [];


  constructor(private teachService: TeacherService){}

  ngOnInit(): void {
    // this.teachService.getApplications().subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.error(err);
    //
    //   }
    // })

    this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
    this.teachService.getBuildingsWithSites().subscribe({
      next: (res: Map<string, string[]>) => this.buildingsWithSites = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })

    this.teachService.getEquipments().subscribe({
      next: (res: any) => this.equipments = res,
      error: err => console.log(err)
    })

    this.teachService.getStaticEnums().subscribe({
      next: (res: any) => this.issueTypes = res.IssueTypes,
      error: err => console.error(err)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  nextPage(){
    if(this.index + 7 >= this.issues.length) {
      this.index = 0;

    } else {
      this.index += 7;
    }
    this.selectedIssues = this.issues.slice(this.index, this.index + 7);
  }

  previousPage(){
    if(this.index - 7 < 0) {
      this.index = this.issues.length - 7;
    } else {
      this.index -= 7;
    }
    this.selectedIssues = this.issues.slice(this.index, this.index + 7);
  }

  protected readonly onsubmit = onsubmit;

  onSubmit() {
    let data = {
      buildingName: this.buildingName,
      siteName: this.autoCompleteForm.value,
      issueType: this.typeIssue,
      equipment: this.equipment,
      description: this.description
    }
    console.log(data);
  }

  onBuildingSelected(value: string) {
    if (this.buildingsWithSites.has(value)) {
      this.options = this.buildingsWithSites.get(value) || [];
      this.filteredOptions = this.autoCompleteForm.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '')),
      );
    } else {
      this.options = [];
    }
  }
}
