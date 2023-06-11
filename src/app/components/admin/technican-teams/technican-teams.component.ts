import {Component, OnInit} from '@angular/core';
import {CommitteeService} from "../../../services/committee.service";
import {User} from "../../../interface/User";
import {MatOptionSelectionChange} from "@angular/material/core";
import {MatSelectChange} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-technican-teams',
  templateUrl: './technican-teams.component.html',
  styleUrls: ['./technican-teams.component.css']
})
export class TechnicanTeamsComponent implements OnInit {

  issueTypes!: string[];
  technicalTeams: Map<string, User[]> = new Map<string, User[]>();
  techWithoutTeam: User[] = [];
  techTeams: string[] = [];
  constructor(private committeeService: CommitteeService, private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.committeeService.getStaticEnums().subscribe({
      next: (value: any) => this.techTeams = value.IssueTypes,
      error: err => console.error(err)
    })
    this.getData();
  }

  getData() {
    this.committeeService.getTechnicalTeams().subscribe({
      next: value => this.technicalTeams = value,
      error: err => console.error(err)
    });

    this.committeeService.getTechnicalTeamsWithoutTeam().subscribe({
      next: value => this.techWithoutTeam = value,
      error: err => console.error(err)
    })
  }

  onOptionSelected(event: MatSelectChange, user: User) {
    console.log(event.value)
    user.technicalTeam = event.value;
    this.updateUser(user);
  }

  onRemove(technician: User) {
    technician.technicalTeam = '';
    this.updateUser(technician)
  }

  private updateUser(user: User){
    this.committeeService.updateUser(user).subscribe({
      next: (value: any) => {
        console.log(value.message)
        this.snackBar.open("Success: " + value.message, 'Close')
      },
      error: err => {
        console.error(err.error.message)
        this.snackBar.open("Success: " + err.error.message, 'Close')
      }
    })

    this.getData();
  }
}
