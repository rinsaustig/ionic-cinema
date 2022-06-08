import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

const IMAGE_DIR = 'stored-image';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  password: string;
  image: LocalFile[] = [];

  constructor(
    private router: Router,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.image = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    })
      .then(
        (result) => {
          console.log('here: ', result);
          this.loadFileData(result.files);
        },
        async (err) => {
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: IMAGE_DIR,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  async loadFileData(fileNames: string[]) {
    const filePath = `${IMAGE_DIR}/${fileNames[fileNames.length - 1]}`;
    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path: filePath,
    });
    this.image.push({
      name: fileNames[fileNames.length - 1],
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    });
    console.log('readFile: ', this.image);
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });
    console.log('saved: ', savedFile);
    this.loadFiles();
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  login() {}

  register() {
    this.router.navigate(['/register']);
  }
}
