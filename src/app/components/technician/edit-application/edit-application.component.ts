import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Application} from "../../../interface/Application";
import {DatePipe} from "@angular/common";
import {User} from "../../../interface/User";
import {Comment} from "../../../interface/Comment";
import {TechnicianService} from "../../../services/technician.service";
import {CommitteeService} from "../../../services/committee.service";

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit {

  technicians: User[] = [];
  hasComment = false;

  newComment: string = '';
  personalInfo!: User;
  constructor(private dialogRef: MatDialogRef<EditApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: Application, private datePipe: DatePipe, private technicianService: TechnicianService) {}
  ngOnInit(): void {

    this.technicianService.getPersonalInfo().subscribe({
      next: (user: User) => this.personalInfo = user,
      error: err => console.error(err)
    })

    this.technicianService.getTechnicians(this.data.issueType).subscribe({
      next: (techs: User[]) => {
        this.technicians = techs;
      },
      error: err => console.error(err)
    })
  }

  onComment(){
    this.hasComment = true;
    this.technicianService.comment(this.newComment, this.data.id).subscribe({
      next: (res: Comment) => {
        let username = this.personalInfo.lastname + " " + this.personalInfo.firstname;
        let comm: Comment = {
          content: this.newComment,
          dateTime: new Date(),
          user: this.personalInfo
        }
        this.data.comments.push(comm);
        this.newComment = '';
      }, error: err => console.error(err)
    })
  }

  onSave(){
    if(this.data.assigneeTechId){
      this.data.status = "ASSIGNED";
    }
    this.technicianService.updateApplication(this.data).subscribe({
      next: (application: Application) => console.log(application),
      error: err => console.error(err)
    });
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(this.hasComment)
  }


}
