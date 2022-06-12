import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SingleService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      overview: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
}
