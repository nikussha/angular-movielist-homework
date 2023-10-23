import { Observable, delay, find, map, of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Errormessage, Movie } from './models';
import { AddMovieService } from './add-movie.service';

export function isError(val: Movie | Errormessage): val is Errormessage {
  return (val as Errormessage).Response === 'False';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function CheckMovie(service: AddMovieService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<null | ValidationErrors> => {
    return service.getMovies().pipe(
      map((movies: any[]) =>
        movies.find(
          (movie: any) =>
            movie.name.toLowerCase() === control.value.toLowerCase()
        )
      ),
      map((matchedMovie) => {
        return matchedMovie ? { movieexists: true } : null;
      })
    );
  };
}

export function CheckControlValue(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let formArray = control as FormArray;
    let controllers = formArray.controls;
    if (controllers.some((control: any) => control.controls !== '')) {
      return null;
    } else {
      return { atLeastOneRequired: true };
    }
  };
}

export function CheckCountriesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let formarray = control as FormArray;
    let formcontrols = formarray.controls;
    if (formcontrols.some((val) => !!val.value)) {
      return null;
    } else {
      return { nocountry: true };
    }
  };
}
