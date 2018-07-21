import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSearchPage } from './member-search';

@NgModule({
  declarations: [
    MemberSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSearchPage),
  ],
})
export class MemberSearchPageModule {}
