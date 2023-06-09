import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Application} from "../../../interface/Application";
import {DatePipe} from "@angular/common";
import {User} from "../../../interface/User";
import {Comment} from "../../../interface/Comment";
import {TechnicianService} from "../../../services/technician.service";

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit {

  selectedDate!: Date;

  technicians: User[] = [];

  usersInComment: User[] = [];
  commentsWithUsers: { comment: Comment, user: User }[] = [];
  newComment = '';
  constructor(private dialogRef: MatDialogRef<EditApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: Application, private datePipe: DatePipe, private technicianService: TechnicianService) {}
  ngOnInit(): void {
    let usersIdOfComments: string[] = [];
    for(let comment of this.data.comments){
      usersIdOfComments.push(comment.user);
    }
    console.log(usersIdOfComments)
    this.technicianService.getUsersInComments(usersIdOfComments).subscribe({
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
    this.technicianService.getTechnicians(this.data.issueType).subscribe({
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
    this.technicianService.updateApplication(this.data).subscribe({
      next: (application: Application) => console.log(application),
      error: err => console.error(err)
    });
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }


}
