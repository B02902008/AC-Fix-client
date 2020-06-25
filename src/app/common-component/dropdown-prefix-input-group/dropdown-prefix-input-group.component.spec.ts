import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPrefixInputGroupComponent } from './dropdown-prefix-input-group.component';

describe('DropdownPrefixInputGroupComponent', () => {
  let component: DropdownPrefixInputGroupComponent;
  let fixture: ComponentFixture<DropdownPrefixInputGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPrefixInputGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPrefixInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
