import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSequenceComponent } from './delete-sequence.component';

describe('DeleteSequenceComponent', () => {
  let component: DeleteSequenceComponent;
  let fixture: ComponentFixture<DeleteSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
