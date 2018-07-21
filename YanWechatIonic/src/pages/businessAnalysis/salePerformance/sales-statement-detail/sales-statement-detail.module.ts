import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesStatementDetailPage } from './sales-statement-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    SalesStatementDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SalesStatementDetailPage),
  ],
})
export class SalesStatementDetailPageModule {}
