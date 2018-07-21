import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the MonthlyTaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthly-task-detail',
  templateUrl: 'monthly-task-detail.html',
})
export class MonthlyTaskDetailPage {
  public config:any;
  public monthTitle:string='燕之坊总部'
//   除开合计之外的数据
  public listMap:Array<any>=[];
//   合计的数据
  public totalmap:Array<any>=[];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public appService:AppService) {
  }
  ionViewDidLoad() {
    this.monthTitle=this.navParams.get('Name');
    this.appService.httpPost('getStoreTaskAnalysis.api',
    {
        storeId:this.navParams.get('storeId'),
        type:this.navParams.get('type'),
        time:this.navParams.get('date')
    }
    ,data=>{
        if(data.code==1){
            console.log(data)
            this.listMap=data['data']['listMap']||[];
            this.totalmap=data['data']['totalMap']||{};
        }else{
            this.appService.toast(data.msg);
        }
    },true)
  }

}
