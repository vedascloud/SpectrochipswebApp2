import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestuserComponent } from './create-testuser.component';

describe('CreateTestuserComponent', () => {
  let component: CreateTestuserComponent;
  let fixture: ComponentFixture<CreateTestuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
