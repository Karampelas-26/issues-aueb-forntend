import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipmentToSiteModalComponent } from './add-equipment-to-site-modal.component';

describe('AddEquipmentToSiteModalComponent', () => {
  let component: AddEquipmentToSiteModalComponent;
  let fixture: ComponentFixture<AddEquipmentToSiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEquipmentToSiteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEquipmentToSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
