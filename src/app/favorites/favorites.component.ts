import { Observable, exhaustMap, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { JsonServer } from '../jsonserver.service';
import { favoriteMovie } from '../models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteMovies$: Observable<favoriteMovie[]> | undefined;
  constructor(private jsonservice: JsonServer) {}

  ngOnInit(): void {
    this.favoriteMovies$ = this.jsonservice.getMovie();
    console.log('Favorites Loaded');
  }

  deleteMovie(movie: favoriteMovie) {
    this.jsonservice.deleteMovie(movie.id).subscribe(() => {
      this.favoriteMovies$ = this.jsonservice.getMovie();
    });
  }
}
