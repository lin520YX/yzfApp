import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumptionDetailPage } from './consumption-detail';

@NgModule({
  declarations: [
    ConsumptionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumptionDetailPage),
  ],
})
export class ConsumptionDetailPageModule {}
