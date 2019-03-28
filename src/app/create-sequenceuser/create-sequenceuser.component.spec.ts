import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSequenceuserComponent } from './create-sequenceuser.component';

describe('CreateSequenceuserComponent', () => {
  let component: CreateSequenceuserComponent;
  let fixture: ComponentFixture<CreateSequenceuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSequenceuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSequenceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
