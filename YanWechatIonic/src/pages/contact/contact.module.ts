import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    ContactPage
  ],
  imports: [
    LazyLoadImageModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}