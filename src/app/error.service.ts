import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  readonly movieSubject = new BehaviorSubject(false);
  readonly countrySubject = new BehaviorSubject(false);
  ismovieError = this.movieSubject.asObservable();
  iscountryError = this.countrySubject.asObservable();
}
