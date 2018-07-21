import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the OrderListDetailTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list-detail-two',
  templateUrl: 'order-list-detail-two.html',
})
export class OrderListDetailTwoPage {
  private goods: any;
  private total: any;
  private memo: any;
  private phone: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    public alertCtrl: AlertController) {
    this.phone = this.navParams.get('phone')
  }

  ionViewDidLoad() {
    // alert(this.navParams.get('scan'))
    this.appservice.getItem('orderlistTwo', val => {
      this.goods = val['goods']
      this.total = 0;
      for (var i = 0; i < this.goods.length; i++) {
        this.total = this.total + this.goods[i]['saleAmount']
      }
    })
  }
  remove(index) {
    this.goods.splice(index, 1);
    this.total = 0;
    for (var i = 0; i < this.goods.length; i++) {
      this.total = this.total + this.goods[i]['saleAmount']
    }
    if (this.goods.length == 0) {
      this.appservice.removeItem('orderlistTwo')
      this.navCtrl.popToRoot();
    }
  }
  reduce(index) {
    if (this.goods[index]['num'] <= 1) {
      this.goods[index]['num'] = 1;
      return;
    }
    this.goods[index]['num']--;
    this.total = 0;
    for (var i = 0; i < this.goods.length; i++) {
      this.total = this.total + this.goods[i]['saleAmount']
    }

  }
  add(index) {
    if (this.goods[index]['num'] >= this.goods[index]['number']) {
      this.goods[index]['num'] == this.goods[index]['number'];
      return;
    }
    this.goods[index]['num']++;
    this.total = 0;
    for (var i = 0; i < this.goods.length; i++) {
      this.total = this.total + this.goods[i]['saleAmount']
    }
  }
  orderSuc() {

    let alert = this.alertCtrl.create({
      title: '您确认要退货吗',
      buttons: [
        {
          text: '确定',
          handler: data => {
            let ary = [];
            let Bry = []
            for (var i = 0; i < this.goods.length; i++) {
              ary.push(
                {
                  goodsId: this.goods[i]['goodsId'],
                  type: this.goods[i]['source'],
                  goodsName: this.goods[i]['goodsName'],
                  salePrice: this.goods[i]['salePrice']
                })
              Bry.push({
                id: this.goods[i]['id'],
                num: this.goods[i]['num']
              })
            }
            let resultObject = { goods: ary }
            let BresultObject = { goods: Bry }

            if (this.navParams.get('scan') == 1) {

              this.appservice.httpPost('refundOrderSubmit.api', {
                phone: this.phone,
                memo: this.memo,
                resultObject: JSON.stringify(resultObject)
              }, data => {
                if (data.code == 1) {
                  this.appservice.alert(data.msg);
                  this.appservice.removeItem('orderlistTwo');
                  this.navCtrl.popToRoot();

                }
              }, true)
            } else {

              this.appservice.httpPost('submitReturnGoods.api', {
                phone: this.phone,
                memo: this.memo,
                resultObject: JSON.stringify(BresultObject)
              }, data => {
                if (data.code == 1) {
                  this.appservice.alert(data.msg);
                  this.appservice.removeItem('orderlistTwo');
                  this.navCtrl.popToRoot();

                } else {
                  this.appservice.alert(data.msg);
                }
              }, true)
            }
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
}
