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
