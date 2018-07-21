import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesRecordPage } from './sales-record';

@NgModule({
  declarations: [
    SalesRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesRecordPage),
  ],
})
export class SalesRecordPageModule {}
