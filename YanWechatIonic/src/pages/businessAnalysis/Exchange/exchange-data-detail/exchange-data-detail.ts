import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ExchangeDataDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange-data-detail',
  templateUrl: 'exchange-data-detail.html',
})
export class ExchangeDataDetailPage {
 goodsName = '';
  protected dateSelected : string = '0';//当天
  protected storeSelected : string = ''; //全部门店
  protected list:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apps:AppService) {
  
    this.dateSelected = this.navParams.get('date');
    this.storeSelected = this.navParams.get('storeId');
    this.goodsName = this.navParams.get('goodsName');
  }

  ionViewDidLoad() {
  	this.getData();
  }

  getData(){
  	this.apps.httpPost('getExchangeStati.api',{'day':this.dateSelected,'storeId':this.storeSelected,'goodsNo':this.navParams.get('goodsNo')},data=>{
      console.log(data);
      if (data.code == -1) {
      	this.apps.toast(data.msg);
      }else{
      	this.list=data['data']||[];
      }

    },true)
  }

}
