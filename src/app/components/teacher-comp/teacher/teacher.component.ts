import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Equipment} from "../../../interface/Equipment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AddEquipmentToSiteModalComponent
} from "../../admin/equipment-comp/add-equipment-to-site-modal/add-equipment-to-site-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PreferencesModalComponent} from "../preferences-modal/preferences-modal.component";
import {ApplicationTeacher} from "../../../interface/ApplicationTeacher";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Notification} from "../../../interface/Notification";
import {NotificationsComponent} from "../notifications/notifications.component";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  index = 0;

  issues: ApplicationTeacher[] = [];


  statusColors: { [key: string]: string } = {
    CREATED: 'rgba(4, 102, 200, 0.7)', //blue
    REJECTED: 'rgba(208, 0, 0, 0.7)', //red
    VALIDATED: 'rgba(114, 9, 183, 0.7)', //purple
    ASSIGNED: 'rgba(251, 133, 0, 0.7)', //oragne
    COMPLETED: 'rgba(22, 219, 101, 0.7)', //green
    ARCHIVED: 'rgba(191, 192, 192, 0.7)' //gray
  };

  selectedIssues = this.issues.slice(this.index,this.index+7);

  buildingsWithSites: Map<string, string[]> = new Map<string, string[]>();
  siteName = new FormControl('', Validators.required);
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  equipments: Equipment[] = [];
  issueTypes: string[] = [];
  issueForm!: FormGroup;
  notifications: Notification[] = [];

  constructor(private teachService: TeacherService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(): void {
    this.setData();
    this.issueForm = new FormGroup({
      buildingName: new FormControl('', Validators.required),
      issueType: new FormControl(),
      equipment: new FormControl(),
      description: new FormControl(''),

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

    this.teachService.getStaticEnums().subscribe({
      next: (res: any) => this.issueTypes = res.IssueTypes,
      error: err => console.error(err)
    })
  }

  setData() {
    this.teachService.getApplications().subscribe({
      next: (res: ApplicationTeacher[]) => {
        this.issues = res;
        this.selectedIssues = this.issues.slice(this.index,this.index+7);
      },
      error: (err) => {
        console.error(err);

      }
    })

    this.teachService.getNotifications().subscribe({
      next: (value: Notification[]) => this.notifications = value,
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
        equipment: this.issueForm.get("equipment")?.value,
        description: this.issueForm.get("description")?.value
      }
      console.log(data)
      this.teachService.submitIssue(data).subscribe({
        next: (res: any) => {
          this.snackBar.open('Success: ' + res.message, "Close", {
            duration: 3000
          });
          this.siteName.reset();
          this.issueForm.reset();
          this.setData();
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

  openPreferences() {
    let dialogRef = this.dialog.open(PreferencesModalComponent, {width: '300px', height: '400px'});
    dialogRef.afterClosed().subscribe({
      next: value => {
        if(value){
          this.setData();
        }
      }
    })
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    this.teachService.getSiteEquipments(event.option.value).subscribe({
      next: (value: Equipment[]) => {
        console.log(value)
        this.equipments = value
      },
      error: err => console.error(err)
    })
  }

  openNotififcations(){
    this.dialog.open(NotificationsComponent, {data: this.notifications})
  }
}
