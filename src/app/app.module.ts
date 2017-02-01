import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BloggerService} from "../providers/blogger-service";
import {ItemDetailsPage} from "../pages/item-details/item-details";
import {ReadMoreComponent} from "../pages/home/read-more";
import {CapitalizePipe} from "../providers/capitalize.pipe";
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {DiocastPage} from "../pages/diocast/diocast";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DiocastPage,
    SettingsPage,
    ItemDetailsPage,
    ReadMoreComponent,
    CapitalizePipe

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DiocastPage,
    SettingsPage,
    ItemDetailsPage,
    ReadMoreComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" },{provide: ErrorHandler, useClass: IonicErrorHandler}, BloggerService]
})
export class AppModule {}
