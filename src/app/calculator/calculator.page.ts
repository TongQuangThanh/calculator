/* eslint-disable @typescript-eslint/prefer-for-of */
import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, IonRouterOutlet, Platform, ToastController } from '@ionic/angular';
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
  isPositive = true;
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
    private routerOutlet: IonRouterOutlet, private platform: Platform, private alertController: AlertController) {
    this.clientHeight = document.defaultView.innerHeight;
    this.platform.backButton.subscribeWithPriority(-1, () => this.exitApp());
    sharedService.exit$.subscribe(() => this.exitApp());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ngAfterViewChecked();
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
    const cells = document.getElementsByClassName('cell');
    const height = document.body.clientWidth / 4;
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
    if (item.isOperator) {
      if (this.isNumberCharacter() || this.isCloseBracketCharacter()) {
        this.input += `${item.value}`;
      }
    } else if (item.value === 'AC') {
      this.input = '';
    } else if (item.value === 'backspace') {
      this.input = this.input.slice(0, this.input.length - 1);
    } else if (item.value === '+/-') {
      if (this.isNumberCharacter()) {

      } else {
        this.isPositive = !this.isPositive;
      }
    } else if (item.value === '( )') {
      const count1 = (this.input.match(/\(/g) || []).length;
      const count2 = (this.input.match(/\)/g) || []).length;
      if (count1 === 0 || count1 === count2) {
        const lastIdx = this.input.length - 1;
        if (['+', '-', 'x', '/', '%'].includes(this.input[lastIdx]) || this.input.length === 0) {
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
      if (this.isPositive) {
        this.input += item.value;
      } else {
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
    } else {
      // eslint-disable-next-line no-eval
      this.result = eval(input);
      this.sharedService.saveHistory(this.input, this.result.toString());
    }
  }

  exitApp() {
    if (!this.routerOutlet.canGoBack()) {
      App.exitApp();
    }
  }
}
