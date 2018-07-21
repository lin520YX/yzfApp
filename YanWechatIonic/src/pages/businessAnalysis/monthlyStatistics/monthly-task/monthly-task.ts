import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
import { NativeService } from '../../../../providers/NativeService';

/**
 * Generated class for the MonthlyTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthly-task',
  templateUrl: 'monthly-task.html',
})
export class MonthlyTaskPage {
  public monthlyTaskDetail = 'MonthlyTaskDetailPage';
  public storeMap;
  public typeName: string = '每月任务';
  private storeSelected: string = ''; //全部门店
  // 新客数
  public newMember: number = 0;
  // 销售额
  public consumePriceSum: number = 0;
  // 新会员数
  public consumeNum: number = 0;
  // 微信粉丝
  public weiXinFansNum: number = 0
  // 目标微信粉丝
  public taskWXMember: number = 0;
  // 目标销售额
  public taskAmount: number = 0;
  // 目标会员
  public taskMember: number = 0;
  // 目标新客数
  public taskCustomer: number = 0;
  // 目标销售额百分比
  public preConsumePrice: any = 0;
  // 目标会员数百分比
  public preMember: any = 0;
  // 目标新客数百分比
  public preCustomer: any = 0;
  // 目标微信粉丝百分比
  public preWeChat: any = 0;
  // 目标销售额二级页面传参数
  public params1;
  // 目标新客二级页面传参数
  public params2;
  // 目标新会员二级页面传参数
  public params3;
  // 目标微信粉丝二级页面传参数
  public params4;
  // 时间参数
  public datemap;
  // 时间
  public dateSelected: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public nativeservice: NativeService) {
    // 时间选择五个月
    this.datemap = new tmpdate(nativeservice).date(5).reverse();
    console.log(this.datemap)
    // 初始化赋予参数
    if (!this.storeSelected) {
      this.typeName = '燕之坊总部';
    }
    this.params1 = {
      type: 1,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params2 = {
      type: 2,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params3 = {
      type: 3,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params4 = {
      type: 4,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
  }

  ionViewDidLoad() {
    this.monthlydata();
    this.appService.httpPost('findOrganization.api', { storeId: '', time: '' }, data => {
      console.log(data)
      this.storeMap = data.storeMap;
    }, false)
    console.log('ionViewDidLoad MonthlyTaskPage');
  }
  changeDate() {
    // 参数改变
    if (!this.storeSelected) {
      this.typeName = '燕之坊总部';
    }
    this.params1 = {
      type: 1,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params2 = {
      type: 2,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params3 = {
      type: 3,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params4 = {
      type: 4,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    console.log(this.params1)
    this.monthlydata(this.storeSelected, this.dateSelected);
  }
  changeStore() {
    console.log()
    for (let i = 0; i < this.storeMap.length; i++) {
      if (this.storeMap[i]['id'] == this.storeSelected) {
        this.typeName = this.storeMap[i]['storeName'];
      }
    }
    if (!this.storeSelected) {
      this.typeName = '燕之坊总部';
    }
    // 参数改变
    this.params1 = {
      type: 1,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params2 = {
      type: 2,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params3 = {
      type: 3,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    this.params4 = {
      type: 4,
      storeId: this.storeSelected,
      Name: this.typeName || '燕之坊总部',
      date: this.dateSelected
    }
    console.log(this.params1)
    this.monthlydata(this.storeSelected, this.dateSelected);
  }
  /**
   * @author() zhongheng
   * @method()monthlydata
   * @returns void
   * */
  monthlydata(storeId?, date?): void {
    this.taskMember = 0;
    // 目标新客数
    this.taskCustomer = 0;
    // 目标销售额百分比
    this.preConsumePrice = 0;
    this.appService.httpPost('findStoreTaskAnalysis.api',
      {
        storeId: storeId,
        time: date
      }
      , data => {
        console.log(data)
        if (data.code == 1) {
          this.newMember = data['date'][0]['NewMemNum'] || 0;
          this.weiXinFansNum = data['date'][0]['weiXinFansNum'] || 0;
          this.consumeNum = data['date'][0]['ConsumeNum'] || 0;
          this.consumePriceSum = data['date'][0]['ConsumePriceSum'] || 0;
          this.taskWXMember = this.taskMember = data['date'][0]['taskWXMember'] || 0;
          this.taskAmount = data['date'][0]['taskAmount'] || 0;
          this.taskMember = data['date'][0]['taskMember'] || 0;
          this.taskCustomer = data['date'][0]['taskCustomer'] || 0;
          this.preMember = this.taskMember == 0 ? '-' : (this.newMember * 100 / this.taskMember).toFixed(2)
          this.preCustomer = this.taskCustomer == 0 ? '-' : (this.consumeNum * 100 / this.taskCustomer).toFixed(2)
          this.preConsumePrice = this.taskAmount == 0 ? '-' : (this.consumePriceSum * 100 / this.taskAmount).toFixed(2)
          this.preWeChat = this.taskWXMember == 0 ? '-' : (this.weiXinFansNum * 100 / this.taskWXMember).toFixed(2)

        } else {
          this.appService.toast(data.msg);
        }
      }, true)
  }
}
/**
 * 时间格式化处理，返回前面五个月
 * 建议使用date-dns 来做时间选择 可能出错率 会小很多
 * */
class tmpdate {
  constructor(
    public nativeservice: NativeService
  ) {

  }
  date(i) {
    let data = [];

    while (i > 0) {
      var dateTmp = new Date().getFullYear() + '-' + new Date().getMonth() + 1;
      if (this.nativeservice.isIos) {
        var date1 = new Date(new Date().getFullYear(), new Date().getMonth());
      }
      if (this.nativeservice.isAndroid) {

        const date1 = new Date(dateTmp);

      }
      date1.setMonth(date1.getMonth() - i);
      var year1 = date1.getFullYear();
      var month1: any = date1.getMonth() + 1;
      month1 = (month1 < 10 ? "0" + month1 : month1);
      var sDate = (year1.toString() + '-' + month1.toString());
      data.push({ date: sDate })
      i--
    }
    return data;
  }
}

