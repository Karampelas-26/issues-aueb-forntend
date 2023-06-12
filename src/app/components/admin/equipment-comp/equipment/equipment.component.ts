import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEquipmentModalComponent } from '../add-equipment-modal/add-equipment-modal.component';
import { CommitteeService } from 'src/app/services/committee.service';
import {EquipmentDataTableComponent} from "../equipment-data-table/equipment-data-table.component";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit{
  @ViewChild(EquipmentDataTableComponent) equipmentTable!: EquipmentDataTableComponent;
  constructor(private dialog:MatDialog,private committee:CommitteeService){

  }

  ngOnInit(): void {

  }

  onAddEquipment():void{
    const diaologRef = this.dialog.open(AddEquipmentModalComponent);
    diaologRef.afterClosed().subscribe({
      next: (result: any) => {
        console.log(result)
        if (result) {
          this.equipmentTable.setData();
        }
      },
      error: err => console.error(err)
    })
  }
}
