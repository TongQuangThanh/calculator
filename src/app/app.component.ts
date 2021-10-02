import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Component } from '@angular/core';
import { appPages, labels } from 'src/environments/constants';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = appPages;
  labels = labels;
  name: string;
  isShe = false;
  constructor(private sharedService: SharedService, private alertController: AlertController,
    private device: Device, private deviceAccounts: DeviceAccounts, private router: Router) {
    this.deviceAccounts.get()
      .then(accounts => {
        for (const acc of accounts) {
          if (acc.name === 'tranthaohn2612@gmail.com' && this.normalizeText(this.device.manufacturer).includes('samsung') &&
            this.normalizeText(this.device.model).includes('a10')) {
            this.isShe = true;
          }
          break;
        }
        if (!this.isShe && !this.name) {
          if (accounts.length > 0) {
            this.name = accounts[0].name;
          } else {
            this.name = 'bạn';
          }
        }
      })
      .catch(() => { this.name = 'bạn'; });
    this.sharedService.get('name').then(name => name ? this.name = name : '');
  }

  clickLabel(icon: string) {
    if (icon === 'exit') {
      this.sharedService.exitApp();
    } else if (icon === 'information-circle') {
      this.router.navigateByUrl('about');
    } else if (icon === 'help-circle') {
      this.router.navigateByUrl('privacy');
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

  normalizeText(text: string) {
    return text.toLowerCase().replace(/\s/g, '');
  }
}
