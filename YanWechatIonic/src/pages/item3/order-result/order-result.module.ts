import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderResultPage } from './order-result';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    OrderResultPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(OrderResultPage),
  ],
})
export class OrderResultPageModule {}
