import {Component, Inject} from '@angular/core';
import {User} from "../../../../interface/User";
import {Comment} from "../../../../interface/Comment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Application} from "../../../../interface/Application";
import {DatePipe} from "@angular/common";
import {TechnicianService} from "../../../../services/technician.service";
import {CommitteeService} from "../../../../services/committee.service";

@Component({
  selector: 'app-edit-application-committee',
  templateUrl: './edit-application-committee.component.html',
  styleUrls: ['./edit-application-committee.component.css']
})
export class EditApplicationCommitteeComponent {

  technicians: User[] = [];
  hasComment = false;
  status: string [] = [];
  newComment: string = '';
  personalInfo!: User;
  constructor(private dialogRef: MatDialogRef<EditApplicationCommitteeComponent>, @Inject(MAT_DIALOG_DATA) public data: Application, private datePipe: DatePipe, private committeeService: CommitteeService) {}
  ngOnInit(): void {
    this.committeeService.getPersonalInfo().subscribe({
      next: (user: User) => this.personalInfo = user,
      error: err => console.error(err)
    })

    this.committeeService.getTechnicians(this.data.issueType).subscribe({
      next: (techs: User[]) => {
        this.technicians = techs;
      },
      error: err => console.error(err)
    })

    this.committeeService.getStaticEnums().subscribe({
      next: (value: any) => this.status = value.Status
    })
  }

  onComment(){
    this.hasComment = true;
    this.committeeService.comment(this.newComment, this.data.id).subscribe({
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
    console.log(this.data)
    this.committeeService.updateApplication(this.data).subscribe({
      next: (application: Application) => console.log(application),
      error: err => console.error(err)
    });
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(this.hasComment)
  }
}
