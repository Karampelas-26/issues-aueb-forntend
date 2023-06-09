import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDataTableComponent } from './equipment-data-table.component';

describe('EquipmentDataTableComponent', () => {
  let component: EquipmentDataTableComponent;
  let fixture: ComponentFixture<EquipmentDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
