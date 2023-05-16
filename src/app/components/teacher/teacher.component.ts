import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  ngOnInit(): void { 
   }

  value = "";

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
}
