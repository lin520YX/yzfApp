import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Navbar, Platform } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the ExchangeDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-exchange-data',
  templateUrl: 'exchange-data.html',
})
export class ExchangeDataPage {
 @ViewChild(Content)content:Content;
 @ViewChild(Navbar)navbar:Navbar;
  protected dateSelected: string = '0';//当天
  protected storeSelected: string = ''; //全部门店
  protected list: any;
  storeMap = [];
  public tList: any;
  public k = 1;
  public apartData = [];
  moreData = true;
  public timeSelect: boolean = false;
  public device: string = '';
  public startTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  public endTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  // 储备 时间选择后点击区域消失储备时间
  public sName = '当天';
  public storeStartTime;
  public storeEndTime;
  public storeMapLength: boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
   public platfrom:Platform) {
    
  }
  /**
   * @author() linyunfu
   * @method() 生命周期
   * @description 处理页面时间选择弹窗出现的bug,已经ios 手势滚动造成的bug
   * @return 没有返回值
   * */ 
  ionViewDidLoad() {
    this.getData();
    this.OrgUser()
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
/**
 * @author() zhongheng
 * @method() 时间选择 
 * @description 时间选择，并且选择之后滚动到第一行
 * @return void
 */  
  changeDate():void {
    this.k = 1;
    this.list = [];
    this.apartData = [];
    this.sName = `自定义`;
    this.getData();
    this.moreData=true;
    this.content.scrollToTop(0)
  }
/**
 * @author() zhongheng
 * @method() 门店改变
 * @description 门店选择，并且选择之后滚动到第一行
 * @return void
 */  
  changeStore():void {
    this.k = 1;
    this.list = [];
    this.apartData = [];
    this.getData();
    this.moreData=true;
    this.content.scrollToTop(0)
  }
/**
 * @author() zhongheng
 * @method() 数据源
 * @param {} day eg:'2018-06-10-2018-06-11'
 * @description 门店选择，并且选择之后滚动到第一行
 * @return void
 */  
  getData():void {
    this.appService.httpPost('findExchangeStati.api', { 'day': this.dateSelected, 'storeId': this.storeSelected }, data => {

      if (data.code == -1) {
        this.appService.toast(data.msg);
        this.startTime = this.storeStartTime;
        this.endTime = this.storeEndTime;
      } else {
        this.storeStartTime = this.startTime;
        this.storeEndTime = this.endTime;
        this.apartData = data['data'] || []
        this.list = this.apartData.slice(0, this.k * 25);
        if (this.apartData.length < 25) {
          this.moreData = false;
        }else{
          this.moreData=true;
        }
        this.tList = data['totalMap'] || [];
      }
    }, true)
  }
  /**
 * @author() zhongheng
 * @method() 上拉刷新
 * @param {} infiniteScroll完成状态
 * @description 每次25个数据 测试在iphonex的长屏幕下能够适应
 * @return void
 */  
  doInfinite(infiniteScroll) {
    var data = this.apartData.slice(this.k * 25, this.k * 25 + 25)
    console.log(data)
    if (data.length % 25 != 0) {
      this.moreData = false;
      this.list = [...this.list,...data||[]]
    } else {
      this.list = [...this.list,...data||[]]
      this.k = this.k + 1;
      console.log(this.k)
    }
    infiniteScroll.complete();

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
    if (this.dateSelected == timeZone) {
      return false;
    }
    this.dateSelected = timeZone;
    this.k = 1;
    this.list = [];
    this.apartData = [];
    this.sName = `自定义`;
    this.getData();
    this.startTime = this.startTime;
    this.endTime = this.endTime;
  }

  getDetail(goodsNo, goodsName) {
    this.navCtrl.push('ExchangeDataDetailPage', { 'date': this.dateSelected, 'storeId': this.storeSelected, 'goodsName': goodsName, 'goodsNo': goodsNo });
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
  OrgUser(): void {
    this.appService.httpPost('findUserOrgStore.api', { storeId: '' }, data => {
      console.log(data)
      this.storeMap = data['date'] || [];
      console.log(this.storeMap)
      this.storeMapLength = this.storeMap.length > 0 ? true : false;

    })
  }
}
