import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ConsumptionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consumption-detail',
  templateUrl: 'consumption-detail.html',
})
export class ConsumptionDetailPage {
 public storeName:any;
  // 订单编号
  public receipt:any;
  // 订单时间
  public orderTime:any;
  // 会员手机
  public phone:any;
  // 商品
  public goods:Array<any>;
  // 订单金额
  public saleAmount:any;
  public totalAmout:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumptionDetailPage');
  	this.appservice.httpPost('getCasPosSaleJson.api',{'posSaleId':this.navParams.get('id')},data=>{
      if (data.code == -1) {
        this.appservice.toast(data.msg);
      }else{
        this.storeName=data['data']['storeName']||'';
          this.receipt=data['data']['receiptNo']||'';
          this.orderTime=data['data']['tradeTime']['time'];
          this.phone=data['data']['cashierNo']||'';
          this.goods=data['data']['listMap']||[];
          this.saleAmount=data['data']['saleAmount']||'';
          this.totalAmout=data['data']['totalAmount']||'';
      }
    },true);
  }

}
