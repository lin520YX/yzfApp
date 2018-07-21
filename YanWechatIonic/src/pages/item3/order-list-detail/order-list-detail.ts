import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the OrderListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list-detail',
  templateUrl: 'order-list-detail.html',
})
export class OrderListDetailPage {
  @ViewChild(Content)content:Content;
  // 店名字
 public storeName:any;
  // 订单编号
  public receipt:any;
  // 订单时间
  public orderTime:any;
  // 会员手机
  public phone:any;
  // 备注
  public memo:any;
  // 商品
  public goods:Array<any>;
  public gifts:Array<any>=[];
  public acts:Array<any>=[];
  // 订单金额
  public saleAmount:any;
  public totalAmout:any;
  public status=1;
  public canReturn=1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('id'))
    this.status=this.navParams.get('status')
    this.appservice.httpPost('getOrderCasPosSale.api',
      { posSaleId: this.navParams.get('id') },
      data => {
        if(data.code==1){
          this.storeName=data['data']['storeName']||'';
          this.receipt=data['data']['receiptNo']||'';
          this.orderTime=data['data']['posTime']['time'];
          this.phone=data['data']['phone']||'';
          this.goods=data['data']['goods']||[];
          this.gifts=data['data']['gifts']||[];
          this.saleAmount=data['data']['saleAmount']||'';
          this.totalAmout=data['data']['totalAmount']||'';
          this.memo=data['data']['memo']||'无';
          this.canReturn=data['data']['canReturn']||0;
          this.acts=data['data']['actMap']||[]
          if(data['data']['recede']!=true){
            this.canReturn = 0;
          }
          this.content.resize();
        }else{

        }
        console.log(data)
      },true
    )
  }
  submit(){
      let Alert=this.alertCtrl.create(
        {
          title:'确定要退货么？',
          buttons:[{
            text:'确定',
            handler:data=>{
            
                this.appservice.httpPost('salesReturnGoodsDetil.api',
                { 
                 posSaleId:this.navParams.get('id')
                }
                ,
                data=>{
                  this.appservice.setItem('orderlistTwo',data['data'])
                  this.navCtrl.push('OrderListDetailTwoPage',{phone:this.phone})
                  
                },true)
            }
          },
          {
            text:'取消',
            handler:data=>{

            }
          }]
        }
      )  
      Alert.present();
  }
}
