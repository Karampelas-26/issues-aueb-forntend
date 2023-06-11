import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicanTeamsComponent } from './technican-teams.component';

describe('TechnicanTeamsComponent', () => {
  let component: TechnicanTeamsComponent;
  let fixture: ComponentFixture<TechnicanTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicanTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicanTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
