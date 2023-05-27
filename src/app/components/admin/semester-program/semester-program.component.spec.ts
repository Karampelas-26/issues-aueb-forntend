import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterProgramComponent } from './semester-program.component';

describe('SemesterProgramComponent', () => {
  let component: SemesterProgramComponent;
  let fixture: ComponentFixture<SemesterProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
