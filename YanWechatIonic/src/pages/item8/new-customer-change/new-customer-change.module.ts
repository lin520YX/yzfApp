import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCustomerChangePage } from './new-customer-change';

@NgModule({
  declarations: [
    NewCustomerChangePage,
  ],
  imports: [
    IonicPageModule.forChild(NewCustomerChangePage),
  ],
})
export class NewCustomerChangePageModule {}
