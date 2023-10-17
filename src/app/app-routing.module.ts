import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
