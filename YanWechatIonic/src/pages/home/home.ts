import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController } from 'ionic-angular';
import { AppService, AppGlobal } from '../../providers/service-public-service/service-public-service'
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storeName = '';
  public userId;
  storeMap = [];
  public slider: Array<any>;
  public len: any;
  public unread: string = '';
  backButtonPressed: boolean = false;
  public myMember = 'MyMemberPage';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private appService: AppService,
    public platform: Platform,
    public toastCtrl: ToastController,
    public appUrl: AppGlobal) {
    this.appService.getItem('userInfo', (val) => {
      this.storeMap = val.storeMap;
      // 一个门店
      if (this.storeMap.length == 1) {
        this.appService.setItem('curStore', this.storeMap[0])
        return;
      }
      this.showRadio();
    });
    // 轮播图
    this.appService.httpPost('home_adJson.api', {}, data => {
      this.unread = data.map.unread;
      this.slider = data.map.adList;
      this.len = data.map.adList.length;
    })
  }
  ionViewWillEnter() {
    this.appService.httpPost('home_adJson.api', {}, data => {
      this.unread = data.map.unread;
    })
  }
  // 销售录入扫码
  saleInputScan(): void {
    this.navCtrl.push('SaleSelectFoodPage', {}, {
      animation: 'md-transition'
    })
  }

  // 最新咨询
  companyInfo(): void {
    this.navCtrl.push('CompanyInfoPage', {}, {
      animation: 'md-transition'
    })
  }
  // 会员注册
  memberRegister(): void {
    this.navCtrl.push('MemberRegisterPage', {}, {
      animation: 'md-transition'
    })
  }
  // 积分兑换
  markExchange(): void {
    this.navCtrl.push('MarkExchangePage', {}, {
      animation: 'md-transition'
    })
  }
  // 订单列表
  orderList(): void {
    this.navCtrl.push('OrderListPage', {}, {
      animation: 'md-transition'
    })
  }
  // 会员查询
  memberSearch(): void {
    this.navCtrl.push('MemberSearchPage', {}, {
      animation: 'md-transition'
    })
  }
  // 会员回访
  memberReturnVisit() {
    this.navCtrl.push('ReturnVisitPage', {}, {
      animation: 'md-transition'
    })
  }
  // 门店选择
  showRadio(): any {

    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });

    alert.setTitle('选择门店');

    for (var i = 0; i < this.storeMap.length; ++i) {
      alert.addInput({
        type: 'radio',
        label: this.storeMap[i].storeName,
        value: i + '',
        checked: false
      });
    }

    alert.addButton({
      text: '确定',
      handler: data => {
        if (!data) {
          return false;
        }
        var pos = parseInt(data);
        this.storeName = this.storeMap[pos].storeName;

        // 原生js储存门店或者门店组id
        this.appService.setItem('curStore', this.storeMap[pos])
      }
    });
    alert.present();
  }
}
