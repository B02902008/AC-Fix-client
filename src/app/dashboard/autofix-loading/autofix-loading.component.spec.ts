import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofixLoadingComponent } from './autofix-loading.component';

describe('AutofixLoadingComponent', () => {
  let component: AutofixLoadingComponent;
  let fixture: ComponentFixture<AutofixLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutofixLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofixLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
