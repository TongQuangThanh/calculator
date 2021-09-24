import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Component } from '@angular/core';
import { appPages, labels } from 'src/environments/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = appPages;
  labels = labels;
  name: string;
  constructor(private sharedService: SharedService, private alertController: AlertController) {
    this.sharedService.get('name').then(name => {
      console.log(name);
      this.name = name;
    });
  }

  clickLabel(icon: string) {
    if (icon === 'exit') {
      this.sharedService.exitApp();
    }
  }

  async clickName() {
    const alert = await this.alertController.create({
      header: 'Nhập tên của bạn!',
      inputs: [
        {
          name: 'name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: (value) => {
            this.sharedService.set('name', value.name);
            this.name = value.name;
          }
        }
      ]
    });

    await alert.present();
  }
}
