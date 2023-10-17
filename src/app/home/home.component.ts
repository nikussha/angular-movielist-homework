import { Country, ResponseData } from './../models';
import { ErrorService } from './../error.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  filter,
  forkJoin,
  from,
  fromEvent,
  map,
  merge,
  mergeMap,
  of,
  reduce,
  switchMap,
  takeWhile,
  tap,
  toArray,
} from 'rxjs';
import { Errormessage, Movie } from '../models';
import { isError, isNull } from '../functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchmovie = new FormControl();

  responseData$: Observable<ResponseData | null> | undefined;

  constructor(
    private service: ApiService,
    private errorservice: ErrorService
  ) {}

  ngOnInit(): void {
    this.responseData$ = this.searchmovie.valueChanges.pipe(
      map((word: string) => word.toLowerCase()),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.service.getMovies(val).pipe(
          map((resp: Movie | Errormessage) => {
            if (isError(resp)) {
              this.errorservice.movieSubject.next(true);
              throw Error(resp.Error);
            } else {
              this.errorservice.movieSubject.next(false);
              let updated = {
                Actors: resp.Actors,
                Awards: resp.Awards,
                Director: resp.Director,
                Genre: resp.Genre,
                imdbRating: resp.imdbRating,
                Poster: resp.Poster,
                Year: resp.Year,
                Country: resp.Country,
                Title: resp.Title,
              };
              return updated;
            }
          }),
          catchError(() => of(null))
        );
      }),
      switchMap((resp: Movie | null) => {
        if (isNull(resp)) {
          return of(null);
        }
        const countries = resp.Country.split(', ');
        const request = countries.map((country: string) => {
          return this.service.getCountry(country).pipe(
            map((resp: Country[]) => resp[0].flags),
            catchError((err) => of(null))
          );
        });
        return forkJoin(request).pipe(
          map((flags) => {
            return {
              ...resp,
              flags: flags,
              id: Math.floor(Math.random() * 1000),
            };
          })
        );
      })
    );
  }
}
