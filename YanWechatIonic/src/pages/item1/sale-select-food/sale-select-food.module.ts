import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleSelectFoodPage } from './sale-select-food';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SaleSelectFoodPage,
  ],
  imports: [
    LazyLoadImageModule,
    IonicPageModule.forChild(SaleSelectFoodPage),
  ],
})
export class SaleSelectFoodPageModule {}
