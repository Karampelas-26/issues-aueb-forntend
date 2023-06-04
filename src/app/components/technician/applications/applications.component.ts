import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit{
  
 value = '';

 filter = 'filters'

 myControl = new FormControl();
 options: string[] = [
  'Α11', 'Α12', 'Α13', 'Α14',
  'Α21', 'Α22', 'Α23', 'Α24',
  'Α31', 'Α32', 'Α33', 'Α34',
  'Α41', 'Α42', 'Α43', 'Α44',
  'Δ11', 'Δ12', 'Δ13', 'Δ14',
  'Δ21', 'Δ22', 'Δ23', 'Δ24',
  'Δ31', 'Δ32', 'Δ33', 'Δ34',
  'Δ41', 'Δ42', 'Δ43', 'Δ44',
];
 filteredOptions!: Observable<string[]>;

 ngOnInit() {
   this.filteredOptions = this.myControl.valueChanges.pipe(
     startWith(''),
     map((value: any) => this._filter(value || '')),
   );
 }

 private _filter(value: string): string[] {
   const filterValue = value.toLowerCase();

   return this.options.filter(option => option.toLowerCase().includes(filterValue));
 }
  
}

