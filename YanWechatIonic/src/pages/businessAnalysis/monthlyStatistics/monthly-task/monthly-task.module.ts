import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyTaskPage } from './monthly-task';

@NgModule({
  declarations: [
    MonthlyTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlyTaskPage),
  ],
})
export class MonthlyTaskPageModule {}
