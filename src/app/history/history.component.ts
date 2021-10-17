import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history = [];
  constructor(private sharedService: SharedService, private clipboard: Clipboard, private toastController: ToastController) { }

  ngOnInit() {
    this.sharedService.get().then((data: any[]) => this.history = data);
  }

  copy(text: string) {
    this.clipboard.copy(text).then(async () => {
      const toast = await this.toastController.create({
        header: 'Copied!!!',
        position: 'top',
        duration: 1000,
        cssClass: 'ion-text-center'
      });
      await toast.present();
    });
  }

  clear() {
    this.sharedService.clear().then(() => this.history = []);
  }
}
