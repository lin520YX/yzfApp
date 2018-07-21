import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service'

/**
 * Generated class for the ConsumptionRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consumption-record',
  templateUrl: 'consumption-record.html',
})
export class ConsumptionRecordPage {
  dataList = [];
  allData=[];
  k=1;
  public moreData = true;
  tradeTypes = ['售','退','换'];
  constructor(public navCtrl: NavController, public navParams: NavParams,public apps: AppService) {
  }

  ionViewDidLoad() {
    
    this.apps.httpPost('findCasPosSaleJson.api',{'memberId':this.navParams.get('memberId')},data=>{
      console.log(data);
      if (data.code == 1) {
        this.allData = data['data'];
        this.dataList = this.allData.slice(0, this.k * 20);
        if (this.allData.length < 20) {
          this.moreData = false;
        }else{
          this.moreData=true;
        }
      }else{
        this.apps.toast(data.msg);
      }
    },true);
  }

  getDetail(id){
    // 下一个页面
    this.navCtrl.push('ConsumptionDetailPage',{id:id})  	

  }
  doInfinite(infiniteScroll) {
    var data = this.allData.slice(this.k * 20, this.k * 20 + 20)
    console.log(data)
    console.log(1)
    if (data.length % 20 != 0) {
      this.moreData = false;
      this.dataList =[...this.dataList,...data];
     } else {
      this.dataList =[...this.dataList,...data];
      this.k = this.k + 1;
      console.log(this.k)
    }
    infiniteScroll.complete();

  }
}
