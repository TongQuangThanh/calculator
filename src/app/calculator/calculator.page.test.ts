import { ActivatedRoute } from '@angular/router';
import { Device } from '@ionic-native/device';
import { DeviceAccounts } from '@ionic-native/device-accounts';
import { ToastController, IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { SharedService } from '../shared.service';
import * as calculator_page from './calculator.page';
// @ponicode
describe('normalizeText', () => {
    let inst: any;

    beforeEach(() => inst = new calculator_page.CalculatorPage(new ActivatedRoute(), new ToastController(),
        SharedService, IonRouterOutlet, Platform, AlertController, Device, DeviceAccounts));

    test('0', () => {
        const result: any = inst.normalizeText('a');
        expect(result).toBe('a');
    });

    test('1', () => {
        const result: any = inst.normalizeText('HeLlO, WORld!');
        expect(result).toBe('hello,world!');
    });

    test('2', () => {
        const result: any = inst.normalizeText('Foo bar');
        expect(result).toBe('foobar');
    });

    test('3', () => {
        inst.normalizeText('Hello');
    });

    test('4', () => {
        inst.normalizeText('!hello, world!');
    });

    test('5', () => {
        inst.normalizeText('THIS IS A TEXT');
    });

    test('6', () => {
        const result: any = inst.normalizeText('This is a Text');
        expect(result).toBe('thisisatext');
    });

    test('7', () => {
        inst.normalizeText('!heLLo, WoRld!');
    });
});
