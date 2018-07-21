import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumptionRecordPage } from './consumption-record';

@NgModule({
  declarations: [
    ConsumptionRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumptionRecordPage),
  ],
})
export class ConsumptionRecordPageModule {}
