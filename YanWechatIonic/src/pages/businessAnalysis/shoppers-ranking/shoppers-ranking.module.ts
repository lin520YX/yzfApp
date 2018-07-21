import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppersRankingPage } from './shoppers-ranking';

@NgModule({
  declarations: [
    ShoppersRankingPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppersRankingPage),
  ],
})
export class ShoppersRankingPageModule {}
