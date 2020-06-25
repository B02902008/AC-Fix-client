import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreuiLayoutComponent } from './coreui-layout.component';

describe('LayoutComponent', () => {
  let component: CoreuiLayoutComponent;
  let fixture: ComponentFixture<CoreuiLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreuiLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreuiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
