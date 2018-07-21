import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkVerifyPage } from './mark-verify';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MarkVerifyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MarkVerifyPage),
  ],
})
export class MarkVerifyPageModule {}
