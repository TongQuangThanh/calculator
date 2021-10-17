import { converts } from './../../environments/constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SharedService } from '../shared.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  page: any;
  clientHeight: number;
  input = '';
  result = 0;
  numberOfBtnOnRow = 3;
  isPositive = true;
  fromValue;
  list;
  toValue;
  faSync = faSync;
  buttons = [
    { value: 'AC' },
    { value: '+/-' },
    { value: 'backspace' },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: '.' },
    { value: 0 },
    { value: '=' },
  ];
  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private sharedService: SharedService,
    private routerOutlet: IonRouterOutlet, private platform: Platform) {
    this.clientHeight = document.defaultView.innerHeight;
    this.platform.backButton.subscribeWithPriority(-1, () => this.exitApp());
    sharedService.exit$.subscribe(() => this.exitApp());
  }

  ngOnInit() {
    for (const page of converts) {
      if (page.url.includes(this.activatedRoute.snapshot.paramMap.get('id'))) {
        this.page = page;
        if (page.url.includes('currency')) {
          this.sharedService.getCurrencies().subscribe((currencies: any) => {
            const arr = [];
            for (const key in currencies.results) {
              if (currencies.results[key]) {
                arr.push(currencies.results[key]);
              }
            }
            arr.sort((a, b) => {
              const nameA = a.currencyName.toUpperCase(); // ignore upper and lowercase
              const nameB = b.currencyName.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              }
              return 0; // names must be equal
            });
            this.list = arr;
            this.fromValue = this.list.find(x => x.id === 'USD');
            this.toValue = this.list.find(x => x.id === 'VND');
          });
        } else {
          this.list = page.data;
          this.fromValue = this.list[0];
          this.toValue = this.list[1];
        }
        return;
      }
    }
  }

  color(i: number, item: any) {
    return item.value === '+/-' && !this.isPositive ? 'light' : i % this.numberOfBtnOnRow === this.numberOfBtnOnRow - 1 ? 'medium' : '';
  }

  swap() {
    [this.fromValue, this.toValue] = [this.toValue, this.fromValue];
  }

  exitApp() {
    if (!this.routerOutlet.canGoBack()) {
      App.exitApp();
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

  checkDisable(item: any) {
    if (item.value === '=') {
      return this.input.length === 0 || !this.fromValue || !this.toValue;
    } else if (item.value === '+/-') {
      return this.page.url.includes('temperature') && this.fromValue.value === 'k';
    }
    return false;
  }

  async cal() {
    if (this.input) {
      let input = this.input.replace(/x/g, '*').replace(/%/g, '/100');
      if (/[a-zA-Z]|\s|\n|\t|\v/g.test(input)) {
        const toast = await this.toastController.create({
          header: 'Biểu thức không hợp lệ!!!',
          message: 'Vui lòng nhập 1 biểu thức hợp lệ',
          position: 'top',
          duration: 1000,
          cssClass: 'ion-text-center'
        });
        await toast.present();
      } else if (input.length !== 0 || !isNaN(Number(input))) {
        if (Number(input) === 0) {
          this.result = 0;
        } else {
          // eslint-disable-next-line no-eval
          input = eval(input);
        }
        if (this.page.url.includes('temperature')) {
          this.calculateTemperature(Number(input));
        } else if (this.page.url.includes('currency')) {
          this.calculateCurrency(Number(input));
        } else {
          this.converts(Number(input));
        }
      } else {
        this.result = 0;
      }
    }
  }

  digitsInfo() {
    return `1.0-${document.body.clientWidth < 300 ? '10' : document.body.clientWidth < 500 ? '16' : '20'}`;
  }

  converts(input: number) {
    this.result = this.fromValue.rate * input / this.toValue.rate;
    this.sharedService.saveHistory(this.input, this.fromValue.name, this.result.toString(), this.toValue.name, this.page);
  }

  calculateTemperature(input: number) {
    if (this.fromValue.value === 'c') {
      if (this.toValue.value === 'k') {
        this.result = input + 273.15;
      } else if (this.toValue.value === 'f') {
        this.result = input * 1.8 + 32;
      } else {
        this.result = input;
      }
    } else if (this.fromValue.value === 'k') {
      if (this.toValue.value === 'c') {
        this.result = input - 273.15;
      } else if (this.toValue.value === 'f') {
        this.result = (input - 273.15) * 1.8 + 32;
      } else {
        this.result = input;
      }
    } else { // from f
      if (this.toValue.value === 'k') {
        this.result = (input - 32) / 1.8 + 273.15;
      } else if (this.toValue.value === 'c') {
        this.result = (input - 32) / 1.8;
      } else {
        this.result = input;
      }
    }
    this.sharedService.saveHistory(this.input, this.fromValue.name, this.result.toString(), this.toValue.name, this.page);
  }

  calculateCurrency(input: number) {
    const q = `${this.fromValue.id}_${this.toValue.id}`;
    this.sharedService.getConvert(q).subscribe((data: any) => {
      this.result = input * data.results[q].val;
      this.sharedService.saveHistory(this.input, this.fromValue.id, this.result.toString(), this.toValue.id, this.page);
    });
  }
}
