import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMemberPage } from './my-member';

@NgModule({
  declarations: [
    MyMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMemberPage),
  ],
})
export class MyMemberPageModule {}
