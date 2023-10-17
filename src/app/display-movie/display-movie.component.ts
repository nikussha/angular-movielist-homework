import { SharedMovie } from './../sharedmovie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Movie, ResponseData } from '../models';

@Component({
  selector: 'app-display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.scss'],
})
export class DisplayMovieComponent implements OnInit {
  @Input() movie: ResponseData | null | undefined;
  constructor(private movieservice: SharedMovie) {}

  ngOnInit(): void {}

  sendMovie() {
    if (this.movie) {
      this.movieservice.sharedMovie.next(this.movie);
    }
  }
}
