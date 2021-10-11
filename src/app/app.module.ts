import { FormsModule } from '@angular/forms';
import { ConvertComponent } from './convert/convert.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { Device } from '@ionic-native/device/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './history/history.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, HistoryComponent, AboutComponent, PrivacyComponent, ConvertComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(),
    AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule, FontAwesomeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Device, DeviceAccounts],
  bootstrap: [AppComponent],
})
export class AppModule { }
