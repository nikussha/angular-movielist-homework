import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JSON_SERVER_API } from './tokens';
import { Injectable, Inject } from '@angular/core';
import { ResponseData, favoriteMovie, updateMovie } from './models';
@Injectable({
  providedIn: 'root',
})
export class JsonServer {
  constructor(
    private http: HttpClient,
    @Inject(JSON_SERVER_API) private jsonserver: string
  ) {}

  postMovie(data: any): Observable<favoriteMovie> {
    return this.http.post<favoriteMovie>(this.jsonserver, data);
  }

  getMovie(): Observable<favoriteMovie[]> {
    return this.http.get<favoriteMovie[]>(this.jsonserver);
  }

  deleteMovie(id: number) {
    return this.http.delete<favoriteMovie>(`${this.jsonserver}/${id}`);
  }

  getCurrentMovie(movieId: string): Observable<favoriteMovie> {
    return this.http.get<favoriteMovie>(`${this.jsonserver}/${movieId}`);
  }

  editMovie(id: string, data: updateMovie) {
    return this.http.patch(`${this.jsonserver}/${id}`, data);
  }
}
