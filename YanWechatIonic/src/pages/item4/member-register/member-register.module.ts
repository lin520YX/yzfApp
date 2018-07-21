import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberRegisterPage } from './member-register';

@NgModule({
  declarations: [
    MemberRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberRegisterPage),
  ],
})
export class MemberRegisterPageModule {}
