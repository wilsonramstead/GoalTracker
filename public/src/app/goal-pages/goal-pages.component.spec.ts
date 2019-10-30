import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPagesComponent } from './goal-pages.component';

describe('GoalPagesComponent', () => {
  let component: GoalPagesComponent;
  let fixture: ComponentFixture<GoalPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
