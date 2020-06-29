import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public handleError(response: HttpErrorResponse) {
    const err = response.error;
    if (err instanceof ErrorEvent) {
      this.router.navigate(['/error'], { queryParams: { code: 0, error: 'Client Error', message: 'Client side error.' } });
    } else {
      this.router.navigate(['/error'], { queryParams: { code: err.status, error: err.error, message: err.message } });
    }
    return throwError('Error occurred.');
  }

}
