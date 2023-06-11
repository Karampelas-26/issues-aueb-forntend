import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Notification} from "../../../interface/Notification";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Notification[], private datePipe: DatePipe) {
  }
}
