import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AddMovieService } from '../add-movie.service';
import { AddedMovie } from '../models';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
  providers: [AddMovieService],
})
export class MovielistComponent implements OnInit {
  myMovies: Observable<AddedMovie[]> | undefined;
  constructor(private service: AddMovieService) {}

  ngOnInit(): void {
    this.myMovies = this.service.getMovies();
  }
}
