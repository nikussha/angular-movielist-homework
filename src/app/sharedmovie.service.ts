import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ResponseData } from './models';
@Injectable({
  providedIn: 'root',
})
export class SharedMovie {
  sharedMovie = new BehaviorSubject<ResponseData | undefined>(undefined);
  movieToShare$: Observable<ResponseData | undefined> =
    this.sharedMovie.asObservable();
}
