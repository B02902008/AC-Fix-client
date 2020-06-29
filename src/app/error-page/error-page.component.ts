import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

  code: number;
  error: string;
  message: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.code = Number(this.route.snapshot.queryParamMap.get('code'));
    this.error = this.route.snapshot.queryParamMap.get('error');
    this.message = this.route.snapshot.queryParamMap.get('message');
    this.router.navigate([], { replaceUrl: true });
  }

}
