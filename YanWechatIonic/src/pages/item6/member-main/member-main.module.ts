import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberMainPage } from './member-main';

@NgModule({
  declarations: [
    MemberMainPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberMainPage),
  ],
})
export class MemberMainPageModule {}
