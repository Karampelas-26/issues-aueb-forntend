import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Equipment} from "../../interface/Equipment";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  siteName = new FormControl('', Validators.required);
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  equipments: Equipment[] = [];
  issueTypes: string[] = [];
  issueForm!: FormGroup;

  constructor(private teachService: TeacherService, private snackBar: MatSnackBar){}

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

    this.issueForm = new FormGroup({
      buildingName: new FormControl('', Validators.required),
      issueType: new FormControl(),
      equipment: new FormControl(),
      title: new FormControl('', Validators.required),

    })

    this.issueForm.addControl("siteName", this.siteName)

    this.filteredOptions = this.siteName.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
    this.teachService.getBuildingsWithSites().subscribe({
      next: (res: Map<string, string[]>) => this.buildingsWithSites = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })

    this.teachService.getEquipments().subscribe({
      next: (res: Equipment[]) => this.equipments = res,
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

    if(this.issueForm.valid){
      const data = {
        siteName: this.siteName.value,
        issueType: this.issueForm.get("issueType")?.value,
        equipment: this.issueForm.get("equipmentId")?.value,
        title: this.issueForm.get("title")?.value
      }
      console.log(this.issueForm.value)
      this.teachService.submitIssue(this.issueForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open('Success: ' + res.message, "Close", {
            duration: 3000
          });
          console.log(res)
        },
        error: err => {
          this.snackBar.open('Error: ' + err.error.message, "Close", {
            duration: 3000
          });
          console.error(err)
        }
      })
    }
  }

  onBuildingSelected(value: string) {
    if (this.buildingsWithSites.has(value)) {
      this.options = this.buildingsWithSites.get(value) || [];
      this.filteredOptions = this.siteName.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '')),
      );
    } else {
      this.siteName.reset();
      this.options = [];
    }
  }
}
