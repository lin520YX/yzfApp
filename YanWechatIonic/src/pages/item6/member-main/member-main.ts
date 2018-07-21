import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the MemberMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-main',
  templateUrl: 'member-main.html',
})
export class MemberMainPage {
  public memberMessage;
  public phone;
  public name;
  public age;
  public accNum;
  public nowAccNum;
  public decNum;
  public facl;
  public sex:any;
  public vipTypeName:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService) {
  }

  ionViewWillEnter() {
    this.appservice.httpPost('getMemberIndex.api',{
      memberId:this.navParams.get('id')},data=>{
      console.log(data)
      this.memberMessage=data;
      this.phone=this.memberMessage['phone']||'';
      this.name=this.memberMessage['name']||'（无）';
      this.age=this.memberMessage['age']||'';
      this.accNum=this.memberMessage['accNum']||0;
      this.nowAccNum=this.memberMessage['nowAccNum']||0;
      this.decNum=this.memberMessage['decNum']||0;
      this.facl=this.memberMessage['facl']||'';
      this.sex=this.memberMessage['sex']||'男'; 
      this.vipTypeName=this.memberMessage['vipTypeName']||'注册会员'; 
    })
  
  }

  memberInfo(){
    this.navCtrl.push('MemberInfoPage',{memberId:this.navParams.get('id')})
  }
  ConsumptionRecord(){
    this.navCtrl.push('ConsumptionRecordPage',{memberId:this.navParams.get('id')})
  }
  MarkExchange(){
    this.navCtrl.push('MarkRecordPage',{memberId:this.navParams.get('id')})
  }
  ExchangeRecord(){
    this.navCtrl.push('ExchangeRecordPage',{memberId:this.navParams.get('id')})
  }
  saleInputScan(): void {
    this.navCtrl.push('SaleSelectFoodPage', {phone:this.phone}, {
      animation: 'md-transition'
    })
  }
  markExchange(){
    this.navCtrl.push('MarkExchangePage', {phone:this.phone}, {
      animation: 'md-transition'
    })
  }
}
