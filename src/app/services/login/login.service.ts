import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.login;
  subRef$: Subscription;
  constructor(
    private fb: FormBuilder,
    public AlertController: AlertController,
    private router: Router,
    private http: HttpClient
  ) {}

  createForm() {
    return this.fb.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(user) {
    let credentials = {
      user: user.user,
      password: user.password,
    };

    this.subRef$ = this.http.post(this.url, credentials).subscribe(
      (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigateByUrl('home', { replaceUrl: true });
      },
      async (error) => {
        const alert = await this.AlertController.create({
          header: 'Datos incorrectos',
          message: error.error.error,
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    );
  }
}
