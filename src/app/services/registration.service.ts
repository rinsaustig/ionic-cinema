import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  url = environment.register;
  subRef$: Subscription;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router
  ) {}

  register(user: { user: any; password: any }) {
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
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: error.error.error,
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    );
  }
}
