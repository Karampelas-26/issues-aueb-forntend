import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEquipmentModalComponent } from '../add-equipment-modal/add-equipment-modal.component';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit{
  
  constructor(private dialog:MatDialog,private committee:CommitteeService){
    
  }

  ngOnInit(): void {
      
  }

  onAddEquipment():void{
    this.dialog.open(AddEquipmentModalComponent,{
      width: '500px',
      height:'500px'
    });
    // this.dialog.afterAllClosed.subscribe({
    //   next: (result) =>{
        
    //   }
  
    //   })
  }
}
