import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {

  @ViewChild(Navbar) navbar: Navbar;
  @ViewChild(Content) content: Content;
  public bulk: any;
  public pack: any;
  public sumMap: any;
  public goods: any;
  public pdata: any;
  public phone: any;
  public Code;
  public smCode: boolean;
  public gift: Array<any>;
  public giftLength: number;
  public code: any;
  public k = true;
  public memo: any;
  public text: any = '验证码';
  public activeMap: any;
  public actId: any;
  public ActName: any;
  public ActNameLength:any;
  // 验证码
  public sCode:any;
  protected saleAmount:number=0
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    public alertCtrl: AlertController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController) {
    this.code = false;
  }
  // 活动选择
  sheet() {
    console.log(this.sumMap)
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择性别',
    });
    for (let i = 0; i < this.activeMap.length; i++) {

      actionSheet.addButton({
        text: this.activeMap[i].actName,
        handler: () => {
          this.actId = this.activeMap[i]['actId']
          this.ActName = this.activeMap[i]['actName'];
        }
      })
    }
    actionSheet.present();
  }
// 读取本地缓存 并且禁止ios 右滑动
ionViewWillEnter() {
    this.saleAmount=0
    // this.navCtrl.swipeBackEnabled = false;
    // this.navbar.backButtonClick = (e) => {
    //   this.leave();
    // }
    // this.platform.registerBackButtonAction(() => {
    //   this.leave();
    // });
    this.appservice.getItem('saleResult', val => {
      console.log(val)
      this.pdata = val;
      this.sumMap = val['sumMap']||[];
      this.activeMap = val['actMap']||[];
      this.ActNameLength=this.activeMap.length||0;
      console.log(this.ActNameLength)
      this.goods = val['goods']||[];
      this.goods.forEach(element => {
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
      this.gift = val['gifts'] || [];
      console.log(this.goods);
      
      console.log(this.gift)
      this.giftLength = this.gift.length || 0;
    })
    console.log('ionViewDidLoad SaleSubmitPage');
  }
  // 提交逻辑处理
  orderSuc() {
    if(this.verify(this.goods)){
      this.appservice.toast('请注意商品金额');
      return ;
    }
    if (!this.phone) {
      this.appservice.alert('手机号码必须填写')
      return
    }
  
    // ///////////////////////////////////
    let alert = this.alertCtrl.create({
      title: '确认退货吗？',
      buttons: [
        {
          text: '确定',
          handler: data => {
            let a = this.pdata['actMap'] || [];
            let b = this.pdata['sumMap'];
            let goods = this.goods.concat(this.gift)
            this.appservice.httpPost('refundOrderSubmit.api', {
              phone: this.phone,
              memo: this.memo||'',
              // smsCode: this.sCode||'',
              resultObject: JSON.stringify({ goods: goods, actId: a, sumMap: b })
            }, data => {
              if (data.code == 1) {
                this.navCtrl.push('OrderResultPage', { data: data['data'] })
                this.appservice.removeItem('saleResult');
                this.appservice.removeItem('bulk');
                this.appservice.removeItem('bulkfull');
                this.appservice.removeItem('bulkleft');
                this.appservice.removeItem('pack');
                this.appservice.removeItem('packfull');
                this.appservice.removeItem('packleft');
                this.appservice.removeItem('sdata');
                this.appservice.removeItem('saleRe');
              } else {
                this.appservice.alert(data.msg)
              }
            }, true)
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
  // 更改
  caculator(index,num){
   if(num>=0){
    this.goods[index]['num']=num;
   }else{
    this.goods[index]['num']='';
   }
   this.saleAmount=0
      this.goods.forEach(element => {
      
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
    this.appservice.setItem('saleRe',{good:this.goods})
    // this.goods[index]['totalPrice']=this.goods[index]['num']* this.goods[index]['price'];
  }
  totalCaculator(index,price){
    if(price>0){
      this.goods[index]['totalPrice']=price;
      this.saleAmount=0
      
      this.goods.forEach(element => {
        console.log(parseFloat(element['totalPrice']))
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      }); 
     }else{
      this.goods[index]['totalPrice']=''
      this.saleAmount=0
      this.goods.forEach(element => {
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
     }
      this.appservice.setItem('saleRe',{good:this.goods})
    // this.goods[index]['num']=this.goods[index]['totalPrice']/ this.goods[index]['price'];
  }
  // 减少
  reduce(index) {
    if (this.goods[index]['num'] <= 1) {
      this.goods[index]['num'] == 1
    } else {
      this.goods[index]['num']--;
    }
    this.saleAmount=0
      this.goods.forEach(element => {
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
    this.appservice.setItem('saleRe',{good:this.goods})

  }
  // 增加
  add(index) {
    this.goods[index]['num']++;
    this.saleAmount=0
      this.goods.forEach(element => {
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
    this.appservice.setItem('saleRe',{good:this.goods})

  }
  // 移除
  remove(index) {
    console.log(index);
    this.goods.splice(index, 1);
    this.saleAmount=0
      this.goods.forEach(element => {
        this.saleAmount=this.saleAmount+(isNaN(parseFloat(element['totalPrice']))?0:parseFloat(element['totalPrice']))
      });
    if (this.goods.length == 0) {
      this.removeManifast();
      this.appservice.removeItem('saleRe');
      this.navCtrl.popToRoot({
        animation: 'md-transition'
      })
      return;
    }else{
      this.appservice.setItem('saleRe',{good:this.goods})
    }
  }
  cancel() {
    this.leave();
  }
  leave() {
    let alert = this.alertCtrl.create({
      title: '确认离开此页面？',
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.removeManifast();
            this.navCtrl.popToRoot();
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
  // 改变参数公共方法
  shopPublic() {
    var item = [];
    if(this.goods.length<=0){
      this.navCtrl.popToRoot();
      this.removeManifast();
      return;
    }
    for (var i = 0; i < this.goods.length; i++) {
      item.push(
        {
          goodsId: this.goods[i]['goodsId'],
          goodsNo: this.goods[i]['goodsNo'],
          salePrice: this.goods[i]['price'],
          goodsName: this.goods[i]['goodsName'],
          num: this.goods[i]['num'],
          type: this.goods[i]['type']
        })
    }
 
    this.appservice.httpPost('submitScanCodeCasPosSale.api',
      { actId:this.actId,
        resultObject: JSON.stringify({ goods: item }) }
      , data => {
        if (data.code == 1) {
          this.pdata = data['data']||[];
          this.activeMap = data['data']['actMap']||[];
          this.goods = data['data']['goods']||[];
          this.sumMap = data['data']['sumMap']||[];
          this.gift = data['data']['gifts'] || [];
          this.giftLength = this.gift.length || 0;
        } else {
          this.appservice.alert(data.msg)
        }
      }, true)
  }
  // 移除本地缓存
  removeManifast(){
    this.appservice.removeItem('saleResult');
    this.appservice.removeItem('bulk');
    this.appservice.removeItem('bulkfull');
    this.appservice.removeItem('bulkleft');
    this.appservice.removeItem('pack');
    this.appservice.removeItem('packfull');
    this.appservice.removeItem('packleft');
    this.appservice.removeItem('sdata');
    this.appservice.setItem('saleRe',{good:this.goods})
  }
  verify(ary):boolean{
    for(var i=0;i<ary.length;i++){
      if(!ary[i]['totalPrice']||ary[i]['totalPrice']==0&&ary[i]['totalPrice']>0){
        return true
      }
    }
  }

}
