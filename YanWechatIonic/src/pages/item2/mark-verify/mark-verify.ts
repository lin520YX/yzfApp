import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the MarkVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mark-verify',
  templateUrl: 'mark-verify.html',
})
export class MarkVerifyPage {
  public phone = '';
  public exchangeVals = 0;
  public canUseMark = 0;
  public smsCodeTime = 0;
  public goodsList = new Array();
 
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public apps:AppService,
    public alertCtrl:AlertController) {
  	this.phone = navParams.get('phone');
  	this.goodsList = navParams.get('goodsJson');
  	this.exchangeVals = navParams.get('exchangeVals');
  	this.canUseMark = navParams.get('canUseMark');
  }

  ionViewDidLoad() {
  }
  
  //减数量 
  onMius(index){
  	var number = this.goodsList[index].number;
  	number-=1;
  	if (number == 0) {
  		this.onDelete(() => {
  			this.exchangeVals -= this.goodsList[index].exchangeVal;
            this.goodsList.splice(index,1);
            if(this.goodsList.length<=0){
              this.navCtrl.popToRoot({
                animation: 'md-transition'
              })
            }
        });
       
  	}else{
  	   this.goodsList[index].number = number;
  	   this.exchangeVals -= this.goodsList[index].exchangeVal;
    }
   
  	
  }
   
  //删除
  onDelete(handler){
  	let confirm = this.alertCtrl.create({
          title: '提示',
          message: '是否要删除该礼品？',
          buttons: [
            {
              text: '确定',
              handler: handler
            },
            {
              text: '取消',
              handler: () => {
              }
            }
          ]
        });
    confirm.present();
  } 

  //加数量
  onAdd(index){
  	this.goodsList[index].number +=1;
  	this.exchangeVals += this.goodsList[index].exchangeVal;
  }

  //发送验证码
  sendSmsCode(){
  	if (this.smsCodeTime > 0 ) {
      return;
    }
  	this.apps.httpPost('get_phone_code.api',{phone:this.phone,code:4},data=>{
  	  console.log(data);  
      if(data.code==1){
        this.apps.toast(data.msg+',请查收');
        this.smsCodeTime = 60;
        let time=setInterval(()=>{
          this.smsCodeTime--;
          if(this.smsCodeTime==0){
              clearInterval(time);
              time=null;
          }
        },1000)
      }else{
        this.apps.toast(data.msg);
      }
    },true)
  }

  //确认兑换
  submit(){
  
  	if (this.exchangeVals > this.canUseMark) {
  	  this.apps.toast('可用积分不足');
  	  return;
  	}
  
  	this.apps.httpPost('integralExchangeGoods.api',{'goodsJson':JSON.stringify(this.goodsList),'phone':this.phone},data=>{
      console.log(data);
      if(data.code!==1){
        this.apps.toast(data.msg);
      }else{

        this.navCtrl.push(
          'MarkFinishPage',{data:data['data']}
        );
      }
    },true)
  }

}
