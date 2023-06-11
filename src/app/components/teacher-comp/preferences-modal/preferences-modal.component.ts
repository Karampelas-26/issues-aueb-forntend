import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../../services/teacher.service";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.component.html',
  styleUrls: ['./preferences-modal.component.css']
})
export class PreferencesModalComponent implements OnInit{

  sitesName: string[] = [];
  preferences: string[] = [];
  sites = new FormControl(['']);

  constructor(private teacherService: TeacherService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<PreferencesModalComponent>) {  }

  ngOnInit(): void {
    this.teacherService.getPreferences().subscribe({
      next: (value: string[]) => {
        this.preferences = value
        this.sites.setValue(this.preferences)
      },
      error: err => console.error(err)
    })

    this.teacherService.getSitesNames().subscribe({
      next: (value: string[]) => this.sitesName = value,
      error: err => console.error(err)
    })


  }

  onSave(){
    this.teacherService.setPreferences(this.sites.value).subscribe({
      next: (value: any) => {
        this.snackBar.open('Success: ' + value.message, 'Close', { duration: 3000 });
        console.log(value)
      },
      error: err => {
        this.snackBar.open('Error: ' + err.error.message, 'Close', { duration: 3000 });
        console.error(err)
      }
    })
    this.dialogRef.close();

  }

  onClose(){
    this.dialogRef.close();
  }


}
