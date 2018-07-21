import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Navbar, Platform } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SalesRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-record',
  templateUrl: 'sales-record.html',
})
export class SalesRecordPage {
  @ViewChild(Content)content:Content;
  @ViewChild(Navbar)navbar:Navbar;
  saleType = '';
  public dateSelected : string = '0';//当天
  public storeSelected : string = ''; //全部门店
  public list:any;
  storeMap = [];
  public tList:any;
  public k=1;
  public apartData=[];
  moreData=true;
  public sName='当天';
  public timeSelect: boolean = false;
  public timeStatus: any = 1;
  public startTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  public endTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  public device: string = '';
  // 储备 时间选择后点击区域消失储备时间
  public storeStartTime;
  public storeEndTime;
  public storeMapLength:any

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public appService:AppService,
     public platfrom:Platform) {
    this.OrgUser()
    this.saleType = this.navParams.get('saleType');
   
  }

  ionViewDidLoad() {
    this.getData();
    this.navCtrl.swipeBackEnabled=false;
    this.navbar.backButtonClick = () => {
      this.timeSelect = false;
      this.navCtrl.popToRoot({
        animation: 'md-transition'
      });
    }
    this.platfrom.registerBackButtonAction(() => {
      this.timeSelect = false;
      this.navCtrl.popToRoot({
        animation: 'md-transition'
      });
    });
  }

  changeDate(){
    this.k = 1;
    this.list = [];
    this.apartData = [];
    this.getData();
    this.moreData=true;
    this.content.scrollToTop(0)
  }
  
  changeStore(){
    this.k = 1;
    this.list = [];
    this.apartData = [];
    this.getData();
    this.moreData=true;
    this.content.scrollToTop(0)
  }
/**
 * @author()linyunfu
 * @method() 数据请求 全局读取参数
 * @return{void}
 * */ 
  getData(){
   
  	 this.appService.httpPost('findMarketingAnalysis.api',{'day':this.dateSelected,'storeId':this.storeSelected,'saleType':this.saleType},data=>{
      
      if (data.code == -1) {
        this.appService.toast(data.msg);
        this.startTime=this.storeStartTime;
        this.endTime=this.storeEndTime;
      }else{
        this.storeStartTime=this.startTime;
        this.storeEndTime=this.endTime;
        this.apartData=data['data']||[]
        this.list=this.apartData.slice(0,this.k*25);
        console.log(this.list.length<25)
        if(this.list.length<25){
          this.moreData=false;
        }else{
          this.moreData=true;
        }
        this.tList=data['totalMap']||[];
        console.log(data)
        console.log(this.moreData)
      }

    },true)
  }


  /**
   * @author()linyunfu
   * @method()上拉刷新 25作为分页
   * @return{void}
   * */ 
  doInfinite(infiniteScroll) {
    var data = this.apartData.slice(this.k * 25, this.k * 25 + 25)
    console.log(data)
    if (data.length % 25 != 0) {
      this.moreData = false;
      this.list = this.list.concat(data)
    } else {
      this.list = this.list.concat(data)
      this.k = this.k + 1;
      console.log(this.k)
    }
    infiniteScroll.complete();

  }

  /**
   * @author()linyunfu
   * @method() 跳转到下一页
   * @return{void} 
   * */ 
  getDetail(goodsNo,goodsName){
  	this.navCtrl.push('SalesRecordDetailPage',{'date':this.dateSelected,'storeId':this.storeSelected,'saleType':this.saleType,'goodsName':goodsName,'goodsNo':goodsNo});
  }

  /**
   * @author() linyunfu
   * @method() 时间选择
   * @return{void}
   * */ 
  timeZoneSelect() {
    if (!/(\d{4}\-)/.test(this.startTime)) {
      this.appService.alert(`请选择开始时间`);
      return;
    }
    if (!/(\d{4}\-)/.test(this.endTime)) {
      this.appService.alert(`请选择结束时间`);
      return;
    }
    if (this.startTime > this.endTime) {
      this.appService.alert(`开始时间不能大于结束时间`)
      return
    }
    let timeZone = `${this.startTime}-${this.endTime}`
    this.timeSelect = false;
    if(this.dateSelected==timeZone){
      return false;
    }
    this.dateSelected = timeZone;
    this.k=1;
    this.list=[];
    this.apartData=[];
    this.sName = `自定义`;
    this.getData();
   
    this.startTime = this.startTime;
    this.endTime = this.endTime;
  }
   /**
   * @author() linyunfu
   * @method() $event  取消弹窗选择
   * @return{void}
   * */ 
  timeOption($event) {
    console.log($event)
    if ($event.target.className == 'timeContent') {
      this.timeSelect = false
    } else {
      this.timeSelect = true;
    }

  }
/**
 * @author() linyunfu
 * @method() openModal
 * @return{void} 
 * */ 
  openModal() {
    this.timeSelect = !this.timeSelect
    this.device = <any>document.getElementById('navbar')['offsetHeight'] + 'px';
  }
  /**
 * @method OrgUser 判断事业部
 * @param {} 默认空读取本地储存的userId storeId
 * @return {void} 无返回值
 */
OrgUser():void {
  this.appService.httpPost('findUserOrgStore.api', { storeId: '' }, data => {
    console.log(data)
    this.storeMap = data['date'] || [];
    console.log(this.storeMap)
    this.storeMapLength = this.storeMap.length > 0 ? true : false;
    console.log(this.storeMap.length)
    console.log(this.storeMapLength)

  })
}
}
