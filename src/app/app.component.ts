import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Component, AfterViewChecked } from '@angular/core';
import { calculators, converts, labels } from 'src/environments/constants';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  calculators = calculators;
  converts = converts;
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

  ngAfterViewChecked() {
    if (document.getElementsByTagName('ion-card')[0] && document.getElementsByTagName('ion-card-header')[0]) {
      const cardHeight = document.getElementsByTagName('ion-card')[0].clientHeight;
      const headerHeight = document.getElementsByTagName('ion-card-header')[0].clientHeight;
      const cells = document.getElementsByClassName('cell');
      const numberOfBtnOnRow = cells.length === 15 ? 3 : 4;
      let height = document.body.clientWidth / numberOfBtnOnRow;
      const numOfBtnOnCol = 5;
      if ((cardHeight - headerHeight) / numOfBtnOnCol < height) {
        height = (cardHeight - headerHeight) / numOfBtnOnCol;
      }
      if (cardHeight - headerHeight < numOfBtnOnCol * height) {
        height = (cardHeight - headerHeight) / numOfBtnOnCol;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < cells.length; i++) {
        const element = cells[i] as HTMLElement;
        element.style.height = height + 'px';
      }
    }
  }

  clickLabel(url: string) {
    if (url) {
      this.router.navigateByUrl(url);
    } else {
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

  normalizeText(text: string) {
    return text.toLowerCase().replace(/\s/g, '');
  }
}
