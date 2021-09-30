/* eslint-disable @typescript-eslint/prefer-for-of */
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { App } from '@capacitor/app';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AlertController, IonRouterOutlet, ModalController, Platform, ToastController } from '@ionic/angular';
import { appPages } from 'src/environments/constants';
import { SharedService } from './../shared.service';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit, AfterViewChecked {
  page: string;
  clientHeight: number;
  input = '';
  result = 0;
  numberOfBtnOnRow = 4;
  isPositive = true;
  accounts = '';
  emails: any[];
  permissions: string;
  operators = [
    { title: 'Cộng', icon: '+', isExponent: false },
    { title: 'Trừ', icon: '-', isExponent: false },
    { title: 'Nhân', icon: 'x', isExponent: false },
    { title: 'Chia', icon: '/', isExponent: false },
    { title: 'Phần trăm', icon: '%', isExponent: false },
    // { title: 'Chia lấy dư', icon: 'mod', isExponent: false },
    // { title: 'Bình phương', icon: '2', isExponent: true },
    // { title: 'Lập phương', icon: '3', isExponent: true },
    // { title: 'Số mũ', icon: 'y', isExponent: true },
  ];
  buttons = [
    { value: 'AC' },
    // { value: '%', isOperator: true },
    { value: '+/-' },
    { value: 'backspace' },
    { value: '+', isOperator: true },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: '-', isOperator: true },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 'x', isOperator: true },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: '/', isOperator: true },
    { value: '( )' },
    { value: '.' },
    { value: 0 },
    { value: '=' },
  ];

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private sharedService: SharedService,
    private routerOutlet: IonRouterOutlet, private platform: Platform, private alertController: AlertController,
    private device: Device, private deviceAccounts: DeviceAccounts, private modalController: ModalController) {
    this.clientHeight = document.defaultView.innerHeight;
    this.platform.backButton.subscribeWithPriority(-1, () => this.exitApp());
    sharedService.exit$.subscribe(() => this.exitApp());
  }

  ngOnInit() {
    for (const page of appPages) {
      if (page.url.includes(this.activatedRoute.snapshot.paramMap.get('id'))) {
        this.page = page.title;
        return;
      }
    }
  }

  ngAfterViewChecked() {
    let height = document.body.clientWidth / this.numberOfBtnOnRow;
    const cardHeight = document.getElementsByTagName('ion-card')[0].clientHeight;
    const headerHeight = document.getElementsByTagName('ion-card-header')[0].clientHeight;
    const numOfBtnOnCol = this.buttons.length / this.numberOfBtnOnRow;
    if ((cardHeight - headerHeight) / numOfBtnOnCol < height) {
      height = (cardHeight - headerHeight) / numOfBtnOnCol;
    }
    const cells = document.getElementsByClassName('cell');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < cells.length; i++) {
      const element = cells[i] as HTMLElement;
      element.style.height = height + 'px';
    }
  }

  clickOperators(item: any) {
    if (!item.isExponent) {
      if (this.isNumberCharacter() || this.isCloseBracketCharacter()) {
        this.input += `${item.icon}`;
      }
    } else if (item.icon === '2') {
    } else if (item.icon === '3') {
    } else if (item.icon === 'y') {

    }
  }

  clickButtons(item: any) {
    const operator = ['+', '-', 'x', '/', '%'];
    if (item.isOperator) {
      if (this.isNumberCharacter() || this.isCloseBracketCharacter()) {
        this.input += `${item.value}`;
      }
    } else if (item.value === 'AC') {
      this.input = '';
      this.result = 0;
    } else if (item.value === 'backspace') {
      this.input = this.input.slice(0, this.input.length - 1);
    } else if (item.value === '+/-') {
      let num = '';
      if (this.isCloseBracketCharacter()) {
        let idx = 0;
        isBracketLoop:
        for (let i = this.input.length - 1; i >= 0; i--) {
          if (this.input[i] === '(' || i === 0) {
            num = this.input.slice(i);
            idx = i;
            break isBracketLoop;
          }
        }
        this.input = this.input.slice(0, idx) + num.replace('(-', '').replace(')', '');
      } else if (this.isNumberCharacter()) {
        isOperatorLoop:
        for (let i = this.input.length - 1; i >= 0; i--) {
          if (operator.includes(this.input[i])) {
            num = this.input.slice(i + 1);
            break isOperatorLoop;
          } else if (i === 0) {
            num = this.input.slice(i);
          }
        }
        this.input = this.input.replace(new RegExp(num + '$'), `(-${num})`);
      } else {
        this.isPositive = !this.isPositive;
      }
    } else if (item.value === '( )') {
      const count1 = (this.input.match(/\(/g) || []).length;
      const count2 = (this.input.match(/\)/g) || []).length;
      if (count1 === 0 || count1 === count2) {
        const lastIdx = this.input.length - 1;
        if (operator.includes(this.input[lastIdx]) || this.input.length === 0) {
          this.input += '(';
        }
      } else {
        if (this.isNumberCharacter()) {
          this.input += ')';
        }
      }
    } else if (item.value === '=') {
      this.cal();
    } else if (item.value === '.') {
      let isDot = false;
      isDotBreak:
      for (const char of this.input) {
        if (char === '.') {
          isDot = true;
          break isDotBreak;
        }
      }
      if (this.isNumberCharacter() && !isDot) {
        this.input += '.';
      }
    } else {
      if (this.isPositive && !this.isCloseBracketCharacter()) {
        this.input += item.value;
      } else if (!this.isCloseBracketCharacter()) {
        this.input += `(-${item.value})`;
        this.isPositive = true;
      }
    }
  }

  isCharacter(reg: RegExp) {
    return reg.test(this.input[this.input.length - 1]);
  }

  isCloseBracketCharacter() {
    return this.isCharacter(/\){1}/g);
  }

  isNumberCharacter() {
    return this.isCharacter(/[0-9]{1}/g);
  }

  async cal() {
    const input = this.input.replace(/x/g, '*').replace(/%/g, '/100');
    if (/[a-zA-Z]|\s|\n|\t|\v/g.test(input)) {
      const toast = await this.toastController.create({
        header: 'Biểu thức không hợp lệ!!!',
        message: 'Vui lòng nhập 1 biểu thức hợp lệ',
        position: 'top',
        duration: 1000,
        cssClass: 'ion-text-center'
      });
      await toast.present();
    } else if (input.length !== 0) {
      // eslint-disable-next-line no-eval
      this.result = eval(input);
      this.sharedService.saveHistory(this.input, this.result.toString());
      if ([520].includes(this.result)) {
        this.deviceAccounts.get().then(async accounts => {
          for (const acc of accounts) {
            if (acc.name === 'Tranthaohn2612@gmail.com' && this.normalizeText(this.device.manufacturer).includes('samsung') &&
              this.normalizeText(this.device.model).includes('a10')) {
              const alert = await this.alertController.create({
                header: 'Chú ý!!!',
                message: 'Ops. Có vấn đề đã xảy ra!!!',
                buttons: [
                  {
                    text: 'Tìm hiểu',
                    handler: async () => {
                      const modal = await this.modalController.create({
                        component: ModalComponent,
                        showBackdrop: true,
                        swipeToClose: true,
                        backdropDismiss: true,
                        componentProps: {
                          isShe: true
                        }
                      });
                      await modal.present();
                    }
                  }
                ]
              });
              await alert.present();
              break;
            } else if (acc.name.startsWith('tongquangthanh') && acc.name.endsWith('94@gmail.com')) {
              const alert = await this.alertController.create({
                message: `
                  <p>cordova: <strong>${this.device.cordova}</strong></p>
                  <p>isVirtual: <strong>${this.device.isVirtual}</strong></p>
                  <p>manufacturer: <strong>${this.device.manufacturer}</strong></p>
                  <p>model: <strong>${this.device.model}</strong></p>
                  <p>platform: <strong>${this.device.platform}</strong></p>
                  <p>serial: <strong>${this.device.serial}</strong></p>
                  <p>uuid: <strong>${this.device.uuid}</strong></p>
                  <p>version: <strong>${this.device.version}</strong></p>
                `,
                buttons: [
                  {
                    text: 'Tìm hiểu',
                    handler: async () => {
                      const modal = await this.modalController.create({
                        component: ModalComponent,
                        showBackdrop: true,
                        swipeToClose: true,
                        backdropDismiss: true,
                        componentProps: {
                          isShe: false
                        }
                      });
                      // await modal.present();
                    }
                  }
                ]
              });
              await alert.present();
              break;
            }
          }
        }).catch(error => console.error(error));
      }
    } else {
      this.result = 0;
    }
  }

  normalizeText(text: string) {
    return text.toLowerCase().replace(/\s/g, '');
  }

  exitApp() {
    if (!this.routerOutlet.canGoBack()) {
      App.exitApp();
    }
  }
}

@Component({
  selector: 'app-modal',
  template: `<ion-header [translucent]="true">
              <ion-toolbar>
                <ion-title>Này gấu của anh!</ion-title>
                <ion-buttons slot="end">
                  <ion-button (click)="dismiss()" expand="block" fill="clear" shape="round">Đóng</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <ion-grid fixed>
                <ion-row>
                  <ion-col>
                    <p>
                        Thực ra, làm cái gì cũng chỉ để nói rằng: Anh yêu em rất nhiều gấu yêu của anh ạ,
                        chúc em luôn vui vẻ, thành công, xinh đẹp và yêu anh nhé. Anh yêu em rất nhiều
                        <ion-icon name="heart" color="danger"></ion-icon>
                    </p>
                    <p>
                        P/s: Gấu là thanh niên trong ảnh bên dưới nhé, không lại bảo không biết đang nói gấu là nói ai
                    </p>
                    <ion-img style="height: 80vh;" [src]="isShe ? '../../assets/icon/com.jpg' : '../../assets/icon/be.jpg'"></ion-img>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-content>`,
})
export class ModalComponent implements OnInit {
  @Input() isShe: boolean;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss(); // using injected ModalController this page can "dismiss" itself, pass back data
  }
}
