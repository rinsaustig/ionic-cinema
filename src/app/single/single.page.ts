import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieModel } from '../models/movie.interface';
import { SingleService } from '../services/single/single.service';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  form: FormGroup;
  movieSelected: MovieModel = null;
  data = false;
  edit = false;
  iconName = 'create-outline';
  constructor(
    private router: Router,
    private store: AppStore,
    private singleService: SingleService,
    private alertController: AlertController
  ) {
    this.init();
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.data = true;
    this.store.state$.subscribe((data) => {
      if (data.movieSelected != null) {
        this.movieSelected = data.movieSelected;
        this.form = this.singleService.createForm();
      } else {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  editSave() {
    this.edit = !this.edit;
    this.data = !this.data;
    if (this.iconName === 'create-outline') {
      this.iconName = 'save-outline';
    } else {
      this.iconName = 'create-outline';
    }
  }

  async submit() {
    if (this.form.valid) {
      this.edit = !this.edit;
      this.data = !this.data;
      this.movieSelected.original_title = this.form.get('title').value;
      this.movieSelected.overview = this.form.get('overview').value;
      this.store.saveMovieSelected(this.movieSelected);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message:
          'Tienes que completar por lo menos 3 letras en el titulo y en la descripción',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }
  }
}
