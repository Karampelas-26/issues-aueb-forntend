import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeleteModalComponent } from './verify-delete-modal.component';

describe('VerifyDeleteModalComponent', () => {
  let component: VerifyDeleteModalComponent;
  let fixture: ComponentFixture<VerifyDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
