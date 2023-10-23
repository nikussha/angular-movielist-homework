import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { COUNTRY_API, JSON_SERVER_API, MOVIE_API } from './tokens';
import { environment } from 'src/environments/environment.prod';
import { HomeComponent } from './home/home.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayMovieComponent } from './display-movie/display-movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovielistComponent } from './movielist/movielist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieRatingComponent,
    DisplayMovieComponent,
    FavoritesComponent,
    MoviedetailsComponent,
    EditmovieComponent,
    AddMovieComponent,
    MovielistComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MOVIE_API,
      useValue: environment.movieapi,
    },
    {
      provide: COUNTRY_API,
      useValue: environment.countryapi,
    },
    {
      provide: JSON_SERVER_API,
      useValue: environment.serverapi,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
