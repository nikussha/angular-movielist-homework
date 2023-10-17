import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { favoriteMovie, updateMovie } from '../models';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.scss'],
})
export class EditmovieComponent implements OnInit {
  _updatedmovie: updateMovie | undefined;
  @Output() cancelevent = new EventEmitter<void>();
  @Output() updateevent = new EventEmitter<updateMovie>();
  @Input() set updatedmovie(val: favoriteMovie) {
    this._updatedmovie = val;
    this.formgroup.patchValue(val);
  }

  formgroup = new FormGroup({
    Title: new FormControl('', Validators.required),
    Genre: new FormControl('', Validators.required),
    Year: new FormControl('', Validators.required),
    Director: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  canceledit() {
    this.cancelevent.emit();
  }

  updatemovie() {
    if (this.formgroup.valid) {
      let updatedmovievalue = this.formgroup.value;
      this.updateevent.emit(updatedmovievalue);
    }
  }
}
