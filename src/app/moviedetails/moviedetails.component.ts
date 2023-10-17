import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { JsonServer } from '../jsonserver.service';
import { favoriteMovie, updateMovie } from '../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss'],
})
export class MoviedetailsComponent implements OnInit {
  isEditMode: boolean = false;
  currentMovie$: Observable<favoriteMovie> | undefined;

  movieId = this.route.snapshot.paramMap.get('movieId');

  constructor(private route: ActivatedRoute, private jsonservice: JsonServer) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.currentMovie$ = this.jsonservice.getCurrentMovie(this.movieId);
    }
  }
  closeedit() {
    this.isEditMode = false;
  }
  openedit() {
    this.isEditMode = true;
  }

  editmovie(movie: updateMovie) {
    this.currentMovie$ = this.jsonservice.editMovie(this.movieId!, movie).pipe(
      switchMap((val) => {
        return this.jsonservice.getCurrentMovie(this.movieId!);
      }),
      tap(() => (this.isEditMode = false))
    );
  }
}
