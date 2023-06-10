import {Component, OnInit} from '@angular/core';
import {CommitteeService} from "../../../../services/committee.service";
import {User} from "../../../../interface/User";

@Component({
  selector: 'app-technican-teams',
  templateUrl: './technican-teams.component.html',
  styleUrls: ['./technican-teams.component.css']
})
export class TechnicanTeamsComponent implements OnInit {

  issueTypes!: string[];
  technicalTeams: Map<string, User[]> = new Map<string, User[]>();

  constructor(private committeeService: CommitteeService) {
  }
  ngOnInit(): void {
    // this.committeeService.getStaticEnums().subscribe({
    //   next: value => this.issueTypes = value.
    // })
  }

}
