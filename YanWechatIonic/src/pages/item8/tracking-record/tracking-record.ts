import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
export class trackItem{
  content:string;
  memo:string;
  resultName:string;
  returnDate:any;
  statusName:string;
  storeName:string;
  userName:string;
}
/**
 * Generated class for the TrackingRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking-record',
  templateUrl: 'tracking-record.html',
})

export class TrackingRecordPage {
  public trackItem:trackItem[]=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService:AppService) {

  }

  ionViewDidLoad() {
    this.appService.httpPost('findMemberReturnRecord',{memberId:this.navParams.get('memberId')},data=>{
      if(data.code==1){
       this.trackItem=data['data'] as trackItem[];
      }else{
        this.appService.alert(`${data.msg}`);
      }
    })
  }

}

