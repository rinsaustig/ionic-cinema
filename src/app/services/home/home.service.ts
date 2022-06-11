import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const reqUrl = environment.getNowPlaying;

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  getNowPlaying(): Observable<any> {
    return this.http.get(reqUrl);
  }

  createForm(): FormGroup {
    return this.fb.group({
      rate: new FormControl(0),
    });
  }
}
