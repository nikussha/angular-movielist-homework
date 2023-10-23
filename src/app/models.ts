import { FormControl } from '@angular/forms';

export interface ResponseData extends Movie {
  flags: any;
  id: number;
}

export interface Movie {
  Actors: string;
  Awards: string;
  Director: string;
  Genre: string;
  imdbRating: string;
  Poster: string;
  Year: string;
  Country: string;
  Title: string;
}

export interface Country {
  flags: {
    png: string;
    jpg: string;
  };
}

export interface Errormessage {
  Response: string;
  Error: string;
}

export interface favoriteMovie extends ResponseData {
  comment?: string[];
}

export type updateMovie = Partial<favoriteMovie>;

export interface AddedMovie {
  name: string;
  countries: string[];
  eventplace?: string;
  genre: string[];
  movieorshow: string;
  tvshowseries?: number;
  movielength?: string;
  rating: string;
  id: number;
  releasedate?: string;
}

export interface CountryType {
  name: string;
  population: number;
}
