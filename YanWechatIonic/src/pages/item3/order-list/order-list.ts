import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { Content } from 'ionic-angular';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  @ViewChild(Navbar)navbar:Navbar;
  @ViewChild(Content)content:Content;
  public dateSelected : string = '30';//一个月内
  public typeSelected : string = '-1'; //全部类型
  public phone;
  public list:any;
  public OrderListDetail;
  // 默认选择门店
  public changeMScan:number=1;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apps:AppService,
    public platform : Platform) {
      this.OrderListDetail='OrderListDetailPage'
  }
  
  ngOnInit(){
    
    this.navbar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.popToRoot({
      animation:'md-transition'
      })
    }
  } 
  
  ionViewDidLoad() {
    this.handleSearch()
  }

  ionViewDidEnter(){
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.popToRoot({
      animation:'md-transition'
      })
    });
  }

  ionViewDidLeave(){  
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
  }  
  changeMenu(index:number):void{
    if(this.changeMScan===index){
        return ;
    }
    this.changeMScan=index;
    this.handleSearch()
  }

  onInput(e){
    if(e.keyCode!=13){
      return false;
    }
    if(e.keyCode==13){
      this.handleSearch();
    }
  }
  handleSearch(){
    var params = {day:this.dateSelected}
    params['type']=this.changeMScan;
    if(this.typeSelected!='-1'){
      params["status"] = this.typeSelected
    }
    if(/^1[3|4|5|7|8|9]\d{9}/.test(this.phone)){
      params["phone"] = this.phone;
    }else if (this.phone != '' && this.phone!=null) {
      this.apps.toast('手机号格式有误');
      return;
    }
    this.gteData(params);
  }
  onCancel(e){
    this.phone=''
  }
  gteData(params){  
    this.list=[];
    this.apps.httpPost('findOrderCasPosSale.api',params,data=>{
      if(data.code==-1){
        this.apps.alert(data.msg);
      }else{
        this.list=data['data']||[];
        console.log(data)
        this.content.resize();
      }
    },true)
  }
  changemonth(){
    this.handleSearch();
  }
  changetype(){
    this.handleSearch();
  }
  addOrder(){
    this.navCtrl.push('OrderScanReturnPage',{
      animation:'md-transition'
    })
  }

}
