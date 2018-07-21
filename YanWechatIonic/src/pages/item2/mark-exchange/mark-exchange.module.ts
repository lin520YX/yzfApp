import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkExchangePage } from './mark-exchange';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    MarkExchangePage,
  ],
  imports: [
    LazyLoadImageModule,
    IonicPageModule.forChild(MarkExchangePage),
  ],
})
export class MarkExchangePageModule {}
