import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenaireComponent } from './openaire.component';

describe('OpenaireComponent', () => {
  let component: OpenaireComponent;
  let fixture: ComponentFixture<OpenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
