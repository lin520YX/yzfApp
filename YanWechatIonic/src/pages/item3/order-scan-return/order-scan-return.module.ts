import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderScanReturnPage } from './order-scan-return';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    OrderScanReturnPage,
  ],
  imports: [
    LazyLoadImageModule,
    IonicPageModule.forChild(OrderScanReturnPage),
  ],
})
export class OrderScanReturnPageModule {}
