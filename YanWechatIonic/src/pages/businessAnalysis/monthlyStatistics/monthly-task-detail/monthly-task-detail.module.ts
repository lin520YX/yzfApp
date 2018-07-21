import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyTaskDetailPage } from './monthly-task-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    MonthlyTaskDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MonthlyTaskDetailPage),
  ],
})
export class MonthlyTaskDetailPageModule {}
