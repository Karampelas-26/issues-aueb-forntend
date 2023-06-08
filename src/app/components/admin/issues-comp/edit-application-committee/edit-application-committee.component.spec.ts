import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplicationCommitteeComponent } from './edit-application-committee.component';

describe('EditApplicationCommitteeComponent', () => {
  let component: EditApplicationCommitteeComponent;
  let fixture: ComponentFixture<EditApplicationCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApplicationCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApplicationCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
