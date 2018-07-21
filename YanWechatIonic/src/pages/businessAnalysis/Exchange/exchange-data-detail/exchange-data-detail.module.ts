import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeDataDetailPage } from './exchange-data-detail';

@NgModule({
  declarations: [
    ExchangeDataDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeDataDetailPage),
  ],
})
export class ExchangeDataDetailPageModule {}
