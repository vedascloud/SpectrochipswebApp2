import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSequenceComponent } from './update-sequence.component';

describe('UpdateSequenceComponent', () => {
  let component: UpdateSequenceComponent;
  let fixture: ComponentFixture<UpdateSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
