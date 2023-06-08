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

  selectedDate!: Date;

  technicians: User[] = [];

  usersInComment: User[] = [];
  commentsWithUsers: { comment: Comment, user: User }[] = [];
  newComment = '';
  constructor(private dialogRef: MatDialogRef<EditApplicationCommitteeComponent>, @Inject(MAT_DIALOG_DATA) public data: Application, private datePipe: DatePipe, private committeeService: CommitteeService) {}
  ngOnInit(): void {
    let usersIdOfComments: string[] = [];
    for(let comment of this.data.comments){
      usersIdOfComments.push(comment.user);
    }
    console.log(usersIdOfComments)
    this.committeeService.getUsersInComments(usersIdOfComments).subscribe({
      next: (usersC: User[]) => {
        this.usersInComment = usersC;
        for(let comment of this.data.comments){
          let user = this.usersInComment.find(user => user.id == comment.user);
          if(user) {
            this.commentsWithUsers.push({comment, user});
          }
        }


      }, error: err => console.error(err)
    })
    this.committeeService.getTechnicians(this.data.issueType).subscribe({
      next: (techs: User[]) => {
        this.technicians = techs;
        console.table(techs)
      },
      error: err => console.error(err)
    })
  }

  onComment(){

  }

  onSave(){
    if(this.data.assigneeTechId){
      this.data.status = "ASSIGNED";
    }
    this.committeeService.updateApplication(this.data).subscribe({
      next: (application: Application) => console.log(application),
      error: err => console.error(err)
    });
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
