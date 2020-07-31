import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sonar-report',
  templateUrl: './sonar-report.component.html',
  styleUrls: ['./sonar-report.component.css']
})
export class SonarReportComponent implements OnInit {

  id: number;
  frameUrl: SafeResourceUrl;
  frameHeight: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  onParamReset(id: number): void {
    if (isNaN(id)) {
      this.router.navigate(['/error'], {
        queryParams: { code: 400, error: 'Bad Request', message: 'Invalid record id, should be a number.' }
      });
    }
    this.id = id;
    this.frameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.SQHost + '/dashboard?id=AC-Fix-Build-' + this.id);
    this.frameHeight = window.innerHeight - 126;
  }

  onResize(e): void {
    this.frameHeight = e.target.innerHeight - 126;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParamReset(Number(params.get('id'))));
  }

}
