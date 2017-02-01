import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {DiocastPage} from "../diocast/diocast";
import {SettingsPage} from "../settings/settings";

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = DiocastPage;
  tab3Root: any = SettingsPage;

  constructor() {}

}
