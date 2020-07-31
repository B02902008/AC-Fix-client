import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarReportComponent } from './sonar-report.component';

describe('SonarReportComponent', () => {
  let component: SonarReportComponent;
  let fixture: ComponentFixture<SonarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
