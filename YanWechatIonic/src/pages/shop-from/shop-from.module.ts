import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopFromPage } from './shop-from';

@NgModule({
  declarations: [
    ShopFromPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopFromPage),
  ],
})
export class ShopFromPageModule {}
