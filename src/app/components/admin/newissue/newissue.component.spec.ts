import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewissueComponent } from './newissue.component';

describe('NewissueComponent', () => {
  let component: NewissueComponent;
  let fixture: ComponentFixture<NewissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewissueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
