import { AddMovieComponent } from './add-movie/add-movie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { DisplayMovieComponent } from './display-movie/display-movie.component';
import { MovielistComponent } from './movielist/movielist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie-rating',
    component: MovieRatingComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'favorites/:movieId',
    component: MoviedetailsComponent,
  },
  {
    path: 'addmovie',
    component: AddMovieComponent,
  },
  {
    path: 'mymovies',
    component: MovielistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
