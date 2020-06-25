import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageGlimpseComponent } from './stage-glimpse.component';

describe('AutofixGlimpseComponent', () => {
  let component: StageGlimpseComponent;
  let fixture: ComponentFixture<StageGlimpseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageGlimpseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageGlimpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
