import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddedMovie, Country, CountryType } from './models';

@Injectable()
export class AddMovieService {
  ALLCOUNTRY_API = 'https://restcountries.com/v3.1/all/';

  constructor(private http: HttpClient) {}

  getAllCountry(): Observable<CountryType[]> {
    return this.http.get<CountryType[]>(this.ALLCOUNTRY_API);
  }

  getMovies(): Observable<AddedMovie[]> {
    return this.http.get<Array<AddedMovie>>('//localhost:3000/myMovies');
  }

  postMovie(mymovie: AddedMovie) {
    return this.http.post('//localhost:3000/myMovies', mymovie);
  }
}
