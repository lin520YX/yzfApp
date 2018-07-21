import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberInfoPage } from './member-info';

@NgModule({
  declarations: [
    MemberInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberInfoPage),
  ],
})
export class MemberInfoPageModule {}
