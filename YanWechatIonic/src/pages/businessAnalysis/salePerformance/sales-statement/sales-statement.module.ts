import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesStatementPage } from './sales-statement';

@NgModule({
  declarations: [
    SalesStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesStatementPage),
  ],
})
export class SalesStatementPageModule {}
