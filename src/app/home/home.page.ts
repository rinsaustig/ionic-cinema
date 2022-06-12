import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MovieModel } from '../models/movie.interface';
import { HomeService } from '../services/home/home.service';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  formRate: FormGroup;
  value: number;
  movies: MovieModel[] = [];
  logo = 'assets/logo.png';
  imageUrl = environment.imageUrl;
  constructor(
    private router: Router,
    private homeService: HomeService,
    private store: AppStore
  ) {}

  ngOnInit() {
    this.auth();
    this.init();
  }

  init() {
    this.store.state$.subscribe((data) => {
      if (data.movies.length > 0) {
        this.movies = data.movies;
      } else {
        this.homeService.getNowPlaying().subscribe((data) => {
          this.movies = data.results;
          this.movies.map((element: any) => {
            element.poster_path = `${this.imageUrl}${element.poster_path}`;
          });
          this.store.saveMovies(this.movies);
        });
      }
    });

    this.formRate = this.homeService.createForm();
  }
  catch(err: any) {
    console.log(err);
  }

  auth() {
    const user = localStorage.getItem('token');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  rate(index: number, value: number) {
    let editedMovie = this.movies[index];
    editedMovie.vote_average = value;
    this.store.editMovie(editedMovie);
    this.store.state$.subscribe((data) => {
      this.movies = data.movies;
    });
  }

  selectMovie(index) {
    this.store.saveMovieSelected(this.movies[index]);
    this.router.navigateByUrl('/single');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
