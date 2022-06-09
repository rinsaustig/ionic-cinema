import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { RegistrationService } from '../services/registration/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('passwordEyeRegister') passwordEye;

  iconpassword = 'eye-off';
  passwordTypeInput = 'password';
  formRegister: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private registrationService: RegistrationService
  ) {
    this.formRegister = this.fb.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmationPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async save() {
    var f = this.formRegister.value;

    if (this.formRegister.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    } else if (f.password == f.confirmationPassword) {
      var user = {
        user: f.user,
        password: f.password,
      };
      this.registrationService.register(user);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos erróneos',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
    this.passwordEye.el.setFocus();
  }
}
