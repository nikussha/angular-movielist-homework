import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  distinct,
  exhaustMap,
  filter,
  from,
  map,
  mergeMap,
  reduce,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { AddMovieService } from '../add-movie.service';
import { AddedMovie, Country, CountryType } from '../models';
import {
  CheckMovie,
  CheckControlValue,
  CheckCountriesValidator,
} from '../functions';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  providers: [AddMovieService],
})
export class AddMovieComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef> | undefined;

  genres = ['comedy', 'action', 'romance', 'horror', 'fantasy'];
  today: string = '';
  selectedstar: number | null = null;
  countriesarr: CountryType[] | undefined;
  submittedform: boolean = false;

  group: FormGroup = this.buildForm();

  constructor(private fb: FormBuilder, private service: AddMovieService) {}

  ngOnInit(): void {
    this.service
      .getAllCountry()
      .pipe(
        map((country: CountryType[]) => {
          return country.map((val: any) => {
            return {
              name: val.name.common,
              population: val.population,
            };
          });
        })
      )
      .subscribe((val) => (this.countriesarr = val));

    this.addcontrol();
    this.checkeventplace();
    this.getDate();
  }

  togglestar(i: any) {
    this.selectedstar = i;
    this.group.get('rating')?.setValue(i);
  }

  controlchange(event: any, target: string) {
    let array = this.group.get('genre') as FormArray;
    if (event.target.checked) {
      array.push(this.fb.control(target));
      console.log(target);
    } else {
      let index = array.controls.findIndex((item) => item.value === target);
      array.removeAt(index);
    }
  }

  get Countries() {
    return this.group.get('countries') as FormArray;
  }

  addformfield() {
    let countryArray = this.group.get('countries') as FormArray;
    if (countryArray.length < 5) {
      let newfield = new FormControl(null);
      this.Countries.push(newfield);
    }
    return;
  }

  checkeventplace() {
    this.group
      .get('countries')
      ?.valueChanges.pipe(
        map((selectedCountries: string[]) => {
          console.log(selectedCountries);
          return selectedCountries.reduce((total, countryName) => {
            const countryData = this.countriesarr!.find(
              (c) => c.name === countryName
            );
            return total + (countryData ? countryData.population : 0);
          }, 0);
        }),
        tap((totalPopulation) => {
          if (totalPopulation > 500000) {
            this.group.get('eventplace')?.enable();
          } else {
            this.group.get('eventplace')?.disable();
          }
        })
      )
      .subscribe();
  }

  buildForm() {
    return this.fb.group({
      name: this.fb.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        [CheckMovie(this.service)]
      ),
      countries: this.fb.array(
        [this.fb.control(null)],
        CheckCountriesValidator()
      ),
      eventplace: this.fb.control(
        { value: null, disabled: true },
        Validators.required
      ),
      releasedate: this.fb.control(null, Validators.required),
      genre: this.fb.array([], CheckControlValue()),
      movieorshow: this.fb.control(null, Validators.required),
      rating: this.fb.control(null, Validators.required),
    });
  }

  submitForm() {
    this.submittedform = true;
    if (this.group.valid) {
      let myMovie: AddedMovie = {
        ...this.group.value,
        id: Math.floor(Math.random() * 1000),
      };
      this.submittedform = false;
      this.service.postMovie(myMovie).subscribe(() => this.resetValues());
      console.log(this.group.value);
    }
  }

  addcontrol() {
    this.group
      .get('movieorshow')
      ?.valueChanges.pipe(
        tap((val) => {
          if (val === 'movie') {
            this.group.addControl(
              'movielength',
              this.fb.control('', Validators.required)
            );
            this.group.removeControl('tvshowseries');
          } else if (val === 'show') {
            this.group.addControl(
              'tvshowseries',
              this.fb.control('', Validators.required)
            );
            this.group.removeControl('movielength');
          }
        })
      )
      .subscribe();
  }

  getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    this.today = `${year}-${month}-${day}`;
  }

  resetValues() {
    this.group.reset();
    this.checkboxes!.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
    this.selectedstar = null;
    let array = this.group.get('countries') as FormArray;
    array.clear();
    array.push(this.fb.control(null));
  }
}
