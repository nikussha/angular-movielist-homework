import { FormControl } from '@angular/forms';
import { Observable, every, filter, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMovie } from '../sharedmovie.service';
import { ResponseData, favoriteMovie } from '../models';
import { JsonServer } from '../jsonserver.service';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
})
export class MovieRatingComponent implements OnInit {
  addcomment = new FormControl();
  favoriteMovie: favoriteMovie | undefined;
  sharedMovie$: Observable<ResponseData | undefined> =
    this.movieservice.movieToShare$.pipe(
      tap((val) => (this.favoriteMovie = val))
    );

  constructor(
    private movieservice: SharedMovie,
    private jsonservice: JsonServer
  ) {}

  ngOnInit(): void {}

  addtofavorites() {
    let comment = this.addcomment.value;
    let favoritemovie = comment
      ? { ...this.favoriteMovie, comment: comment }
      : { ...this.favoriteMovie };
    this.jsonservice.postMovie(favoritemovie).subscribe((movie) => movie);
    this.addcomment.reset();
    return alert('movie added');
  }
}
