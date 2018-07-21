import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInfoDetailPage } from './company-info-detail';

@NgModule({
  declarations: [
    CompanyInfoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyInfoDetailPage),
  ],
})
export class CompanyInfoDetailPageModule {}
