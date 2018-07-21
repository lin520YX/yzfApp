import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesRecordDetailPage } from './sales-record-detail';

@NgModule({
  declarations: [
    SalesRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesRecordDetailPage),
  ],
})
export class SalesRecordDetailPageModule {}
