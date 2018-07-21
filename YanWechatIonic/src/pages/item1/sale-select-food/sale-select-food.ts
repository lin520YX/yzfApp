import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service'
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the SaleSelectFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-select-food',
  templateUrl: 'sale-select-food.html',
})
export class SaleSelectFoodPage {
  @ViewChild('height') height: ElementRef;
  @ViewChild('div') div: ElementRef;
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navbar: Navbar;
  protected i = 0;
  protected priceTotal = 0;
  protected num = 0;
  protected leftCate = [];
  protected rightCate = [];
  defaultImage = 'assets/imgs/default.png';
  offset = 10;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    private alertCtrl: AlertController,
    public appUrl: AppGlobal) {
    const srollEvent$ = Observable.fromEvent(document.getElementById('container'), 'scroll')
      console.log(navParams.get('phone'))
  }
  ionViewWillEnter() {

    // init 合计
    this.navbar.backButtonClick = () => {
      this.appservice.removeItem('saleResult');
      this.appservice.removeItem('bulk');
      this.appservice.removeItem('bulkfull');
      this.appservice.removeItem('bulkleft');
      this.appservice.removeItem('pack');
      this.appservice.removeItem('packfull');
      this.appservice.removeItem('packleft');
      this.appservice.removeItem('sdata');
      this.appservice.removeItem('saleRe');
      this.navCtrl.pop({
        animation: 'md-transition'
      });
    }
    this.num = 0;
    this.priceTotal = 0;
    this.appservice.getItem('bulkfull', val => {
      if (val == 1 || !val) {
        this.goodList();
      } else {
        this.rightCate = val;
        this.content.resize()
        this.appservice.getItem('saleRe', Bval => {
          if (Bval == 1 || !Bval) {
            this.content.resize()
            this.rightCate.forEach(re => {
              re['list'].forEach(le => {
                if (le['checked']) {
                  console.log(le)
                  this.num = this.num + 1;
                  this.priceTotal = this.priceTotal + Number(le['saleQty'])
                }
              });
            })
          } else {
            var Rdata = Bval['good'];
            this.rightCate.forEach(re => {
              re['list'].forEach(le => {
                Rdata.forEach(_rd => {
                  if (_rd['goodsNo'] === le['goodsNo']) {
                    le['checked'] = true;
                    this.num = this.num + 1;
                    le['saleQty'] = _rd['totalPrice']
                    le['num'] = 1;
                    this.priceTotal = this.priceTotal + Number(_rd['totalPrice']);
                  }
                });
              });
            })
          }
        })
      }
    });
    this.appservice.getItem('bulkleft', val => {
      if (val == 1 || !val) {
        // this.goodList(1);
      } else {
        this.leftCate = val;
        this.content.resize()
      }
    })
  }
  ionViewDidLoad() {
    // 商品类型
    if (this.navParams.get('type') == 2) {
      return;
    }


  }
  goodList() {
    // 商品列表
    this.appservice.httpPost('findGoods.api',
      {
        categoryId: '',
      }
      , data => {
        if (data.code == -1) {
          this.appservice.alert(data.msg)
          this.navCtrl.pop({
            animation: 'md-transition'
          });
        } else {
          data['data'].forEach(element => {
            element['list'].forEach(listel => {
              listel=Object.assign(listel,{'checked':false,'num':1})
            });
          });
          this.rightCate = data['data'];
          this.leftCate = data['data'];
          this.content.resize();
        }
        console.log(data)
      }, true);
  }
  select(index) {
    this.i = index;
    this.div.nativeElement.scrollTop = this.div.nativeElement.getElementsByTagName("ion-row")[index].offsetTop;
  }

  test() {
    let dom = this.div.nativeElement;
    // 设置外部容器的高度
    let domChildren = this.div.nativeElement.getElementsByTagName("ion-row")
    for (var i = 0; i < domChildren.length; i++) {
      ((i) => {
        var target = parseInt(domChildren[i].offsetTop) - Number(dom.scrollTop)
        if (target <= 0) {
          this.i = i;
        }
      })(i)
    }
  }
  cal() {
    this.priceTotal = 0;
    this.num = 0;
    this.numCalculator();
    this.saleSubmit();
  }
  foodSelect(index, i, saleQty, name) {
    let p = this.navParams.get('salePrice')
    if (p) {
      if (this.rightCate[index].list[i]['checked'] == false) {
        this.rightCate[index].list[i]['checked'] = true;
        this.rightCate[index].list[i]['saleQty'] = Number(p);
        this.appservice.setItem('bulkfull', this.rightCate);
        this.cal();
      } else {

        this.rightCate[index].list[i]['checked'] = false;
        this.rightCate[index].list[i]['saleQty'] = 0;
        this.cal();
      }

      return;
    }
    // 字符串模版绑定固定值
    let prompt = this.alertCtrl.create({
      title: `${name}`,
      inputs: [
        {
          type: "number",
          placeholder: `${saleQty ? saleQty : '请输入金额'}`,
          value: `${saleQty >= 0 ? saleQty : ''}`,
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            if (data[0] !== '') {
              this.rightCate[index].list[i]['checked'] = false;
              this.rightCate[index].list[i]['saleQty'] = '';
              this.priceTotal = 0;
              this.num = 0;
              this.numCalculator();
            }
          }
        },
        {
          text: '确定',
          handler: data => {
            this.priceTotal = 0;
            this.num = 0;
            if (data[0] <= 0) {
              this.appservice.toast('不能小于或者等于0');
              return;
            }
            if (this.rightCate[index].list[i]['checked'] == true) {
              if (data[0] != 0 && data != '') {
                this.rightCate[index].list[i]['checked'] = true;
                this.rightCate[index].list[i]['saleQty'] = data[0];
              } else {
                this.rightCate[index].list[i]['checked'] = false;
                this.rightCate[index].list[i]['saleQty'] = 0;
              }
            } else if (!data[0] || data[0] == 0) {
              return;
            } else {
              this.rightCate[index].list[i]['saleQty'] = data[0];
              this.rightCate[index].list[i]['checked'] = true;
            }
            this.numCalculator();
          }
        }
      ]
    });
    prompt.present();
  }

  saleSubmit() {

    let item = [];
    this.rightCate.forEach(element => {
      element['list'].forEach(listel => {
        if(listel['checked']){
         item=[...item,
          {
            goodsId: listel['goodsId'],
            goodsNo: listel['goodsNo'],
            salePrice: listel['saleQty'],
            goodsName: listel['goodsName'],
            num: 1,
            type: listel['type'],
          }
         ]
        }
      });
    });
    if (item.length <= 0) {
      this.appservice.alert('请选择产品');
      return;
    }

    this.appservice.httpPost('submitScanCodeCasPosSaleSam.api', {
      resultObject: JSON.stringify({ goods: item })
    }, data => {
      console.log(JSON.stringify(data)+'销售提交')
      if (data.code == 1) {
        this.appservice.setItem('bulkfull', this.rightCate);
        this.appservice.setItem('bulkleft', this.leftCate)
        this.appservice.setItem('bulk', item);
        this.appservice.setItem('saleResult', data.data);
        this.navCtrl.push('SaleSubmitPage',{phone:this.navParams.get('phone')});
      } else {
        this.appservice.toast(data.msg);
      }
    }, true)
  }
  /**
   * @author() linyunfu
   * @method() public 显示与计算
   * @returns{} void
   */ 
  numCalculator():void{
    this.rightCate.forEach(element => {
      element['list'].forEach(listel => {
        if(listel['checked']){
          this.num = this.num + 1
          this.priceTotal = this.priceTotal + Number(listel['saleQty'])
        }
      });
    });
  }
}
