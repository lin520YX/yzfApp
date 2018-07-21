import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleInputPage } from './sale-input';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    SaleInputPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SaleInputPage),
  ],
})
export class SaleInputPageModule {}
