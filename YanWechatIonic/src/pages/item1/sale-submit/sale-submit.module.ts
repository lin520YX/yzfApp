import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleSubmitPage } from './sale-submit';

@NgModule({
  declarations: [
    SaleSubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleSubmitPage),
  ],
})
export class SaleSubmitPageModule {}
