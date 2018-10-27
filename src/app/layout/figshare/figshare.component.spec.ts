import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigshareComponent } from './figshare.component';

describe('FigshareComponent', () => {
  let component: FigshareComponent;
  let fixture: ComponentFixture<FigshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
