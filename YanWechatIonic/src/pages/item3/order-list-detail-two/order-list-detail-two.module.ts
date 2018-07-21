import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListDetailTwoPage } from './order-list-detail-two';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    OrderListDetailTwoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(OrderListDetailTwoPage),
  ],
})
export class OrderListDetailTwoPageModule {}
