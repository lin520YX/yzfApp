import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service'

/**
 * Generated class for the MarkRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mark-record',
  templateUrl: 'mark-record.html',
})
export class MarkRecordPage {
  dataList = [];
  allData=[];
  k=1;
  public moreData = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apps: AppService) {
  }

  ionViewDidLoad() {
    
    this.apps.httpPost('findIntegralDatil.api',{'memberId':this.navParams.get('memberId')},data=>{
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
