import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalStyleLogDisplayComponent } from './terminal-style-log-display.component';

describe('TerminalLikeDisplayComponent', () => {
  let component: TerminalStyleLogDisplayComponent;
  let fixture: ComponentFixture<TerminalStyleLogDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalStyleLogDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalStyleLogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
