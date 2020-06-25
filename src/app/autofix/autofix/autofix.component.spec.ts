import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofixComponent } from './autofix.component';

describe('AutofixComponent', () => {
  let component: AutofixComponent;
  let fixture: ComponentFixture<AutofixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutofixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
