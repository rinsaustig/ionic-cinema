// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  linkedin: 'https://www.linkedin.com/in/rodrigo-gomez-insausti-0a867b48/',
  production: false,
  register: 'http://localhost:3000/users/register',
  login: 'http://localhost:3000/users/login',
  imageUrl: 'https://image.tmdb.org/t/p/original',
  getNowPlaying:
    'https://api.themoviedb.org/3/movie/now_playing?api_key=70a4f9f1812acbe8876b6c584e8fddb8&language=es-ES&page=1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
