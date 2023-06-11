import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertnewbuildingComponent } from './insertnewbuilding.component';

describe('InsertnewbuildingComponent', () => {
  let component: InsertnewbuildingComponent;
  let fixture: ComponentFixture<InsertnewbuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertnewbuildingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertnewbuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
