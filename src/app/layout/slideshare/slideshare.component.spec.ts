import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshareComponent } from './slideshare.component';

describe('SlideshareComponent', () => {
  let component: SlideshareComponent;
  let fixture: ComponentFixture<SlideshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

