import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthrorizedComponent } from './unauthrorized.component';

describe('UnauthrorizedComponent', () => {
  let component: UnauthrorizedComponent;
  let fixture: ComponentFixture<UnauthrorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthrorizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthrorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
