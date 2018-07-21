import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { NativeService } from '../../../providers/NativeService';

/**
 * Generated class for the MyMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-member',
  templateUrl: 'my-member.html',
})
export class MyMemberPage {
  // 时间选择
  @ViewChild(Navbar) navbar: Navbar;
  public timeSelect: boolean = false;
  public mItems = [];
  public sName = '当天';
  public dataMore = true;
  public device: string = '';
  public memberdataArray: Array<any> = [];
  public AllmemberdataArray: Array<any> = [];
  public startTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  public endTime: any = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
  // 记录时间状态 1当天 -1昨天 一个月30天 自定义
  public timeStatus: any = 1;
  public k = 1;
  public moreData = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public loading: LoadingController,
    public platfrom: Platform,
    public nativeService: NativeService) {
    this.data(1)
  }

  ionViewDidLoad() {
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
    this.mItems = [
      { itemName: '当天', type: 1, checked: true },
      { itemName: '昨天', type: -1, checked: false },
      { itemName: '当月', type: 30, checked: false }]
  }
  memberMain(id) {
    this.navCtrl.push('MemberMainPage', { id: id })

  }
  Select(keyValue) {
    this.timeSelect = false;
    for (let i = 0; i < this.mItems.length; i++) {
      var node = this.mItems[i]
      for (let attr in node) {
        console.log(node[attr])
        if (attr == 'type' && node[attr] == keyValue) {
          console.log('attr' + attr)
          this.timeStatus = node['attr']
          if (node[attr] == -1) {
            let nowDate = new Date((new Date().getTime() - (24 * 60 * 60 * 1000)));
            this.startTime = nowDate.getFullYear() + '-' + ((nowDate.getMonth() + 1) >= 10 ? (nowDate.getMonth() + 1) : '0' + (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() >= 10 ? nowDate.getDate() : '0' + (nowDate.getDate()));
            this.endTime = nowDate.getFullYear() + '-' + ((nowDate.getMonth() + 1) >= 10 ? (nowDate.getMonth() + 1) : '0' + (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() >= 10 ? nowDate.getDate() : '0' + (nowDate.getDate()));
          } else if (node[attr] == 1) {
            this.startTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + (new Date().getDate()));
            this.endTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
          } else if (node[attr] == 30) {
            this.startTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? '01' : '01');
            this.endTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate());
          }
          node['checked'] = true;
          this.data(keyValue)

          this.sName = node['itemName'];
        } else if (attr == 'type' && node[attr] != keyValue) {
          node['checked'] = false;
        }
      }
    }
  }

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
    this.timeStatus = timeZone;
    this.data(timeZone);
    this.sName = `自定义`;
    this.mItems = [
      { itemName: '当天', type: 1, checked: false },
      { itemName: '昨天', type: -1, checked: false },
      { itemName: '当月', type: 30, checked: false }]
    this.startTime = this.startTime;
    this.endTime = this.endTime;
  }
  timeOption($event) {
    console.log($event)
    if ($event.target.className == 'timeContent') {
      this.timeSelect = false
    } else {
      this.timeSelect = true;
    }

  }

  openModal() {
    this.timeSelect = !this.timeSelect
    this.device = <any>document.getElementById('navbar')['offsetHeight'] + 'px';
  }
  data(status?) {
    console.log(status)
    this.moreData = true;
    this.appService.httpPost('getMemderScoreInfo.api', { state: status, page: 1 }, r => {
      console.log(r)
      // console.log(r['data'])

      if (r.code == 1) {
        this.AllmemberdataArray = r['data'];
        this.memberdataArray = this.AllmemberdataArray.slice(0, this.k * 20);
        if (this.AllmemberdataArray.length < 20) {
          this.moreData = false;
        }else{
          this.moreData=true;
        }
      }
      if (r['data'].length < 10) {
        this.dataMore = false
      }
    }, true)
  }
  doInfinite(infiniteScroll) {
    var data = this.AllmemberdataArray.slice(this.k * 20, this.k * 20 + 20)
    console.log(data)
    if (data.length % 20 != 0) {
      this.moreData = false;
      this.memberdataArray = [...this.memberdataArray,...data];
    } else {
      this.memberdataArray = [...this.memberdataArray,...data];
      this.k = this.k + 1;
      console.log(this.k)
    }
    infiniteScroll.complete();

  }
}