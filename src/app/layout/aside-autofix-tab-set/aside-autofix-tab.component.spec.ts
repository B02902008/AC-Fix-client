import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideAutofixTabComponent } from './aside-autofix-tab.component';

describe('AsideAutofixTabsetComponent', () => {
  let component: AsideAutofixTabComponent;
  let fixture: ComponentFixture<AsideAutofixTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideAutofixTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideAutofixTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
