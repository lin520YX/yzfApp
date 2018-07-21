import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInfoPage } from './company-info';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    CompanyInfoPage,
  ],
  imports: [
    LazyLoadImageModule,
    IonicPageModule.forChild(CompanyInfoPage),
  ],
})
export class CompanyInfoPageModule {}
