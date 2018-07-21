import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = 'HomePage';
  tab2Root = 'AboutPage';
  tab3Root = 'ContactPage';
  constructor(
  
  ) {
  }


}
