import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingRecordPage } from './tracking-record';

@NgModule({
  declarations: [
    TrackingRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingRecordPage),
  ],
})
export class TrackingRecordPageModule {}
