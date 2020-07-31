import { Component, Input, OnInit } from '@angular/core';

import { AcFixService } from '../../ac-fix/ac-fix.service';

import { AsideAcFixTabData, AcFixStageGlimpse } from '../layout-interface-and-const';

@Component({
  selector: 'app-aside-ac-fix-tab',
  templateUrl: './aside-ac-fix-tab.component.html'
})
export class AsideAcFixTabComponent implements OnInit {

  @Input() tab: AsideAcFixTabData;
  glimpses: AcFixStageGlimpse[] = [];

  constructor(private service: AcFixService) { }

  ngOnInit(): void {
    this.service.getWebSocket(this.tab.name).stageEmit.subscribe(msg => this.handleStageMessage(msg));
  }

  handleStageMessage(msg: string): void {
    const stage = msg.split(': ')[0];
    const state = msg.split(': ')[1];
    const index = Number(msg.split('#')[1]);
    const latest = this.glimpses.length > 0 ? this.glimpses[0] : null;
    if (latest === null || (latest.finish && latest.index !== index)) {
      this.glimpses.unshift({ index, stage: [], finish: false });
    } else if (!latest.finish && latest.index === index) {
      latest.finish = true;
    } else if (isNaN(this.statToNum(state))) {
      return;
    } else if (latest.stage.length === 0) {
      latest.stage.push({ name: stage, stat: this.statToNum(state) });
    } else if (this.statToNum(state) === 0) {
      const last = latest.stage[latest.stage.length - 1];
      if (last.name !== stage && last.stat !== 0) { latest.stage.push({ name: stage, stat: this.statToNum(state) }); }
    } else {
      const last = latest.stage[latest.stage.length - 1];
      if (last.name === stage && last.stat === 0) { last.stat = this.statToNum(state); }
    }
  }

  statToNum(stat): number {
    switch (stat) {
      case 'OK':
        return 1;
      case '...':
        return 0;
      case 'Failed':
        return -1;
      default:
        return NaN;
    }
  }

}
