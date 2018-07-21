import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeDataPage } from './exchange-data';

@NgModule({
  declarations: [
    ExchangeDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeDataPage),
  ],
})
export class ExchangeDataPageModule {}
