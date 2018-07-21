import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the StoreRankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-ranking',
  templateUrl: 'store-ranking.html',
})
export class StoreRankingPage {
  @ViewChild(Content) content: Content;
  private storeSelected: string = '';
  public type = false;
  public total: Object = {};
  public data = [];
  public i = 1;
  public refresh = true;
  // select store
  public storeMap;
  public storeMapLength: boolean;
  // 月份
  public monthly = [];
  // 导购全国排名
  public shopperRanking: number = 1;
  // 销售额平均数
  public averageAmount: number = 0;
  // 我的销售额
  public userAmount: number = 0;
  // 中位数销售额
  public medianAmount: number = 0;
  // 销售额百分比
  public percentage: string = '';
  // 上一名
  public distanceLast: number = 0;
  // 与第一名相差
  public distanceFirst: number = 0;
  // 导购新会员排名
  public memshopperRanking: number = 1;
  // 销售额平均数
  public memaverageAmount: number = 0;
  // 我的销售额
  public memuserAmount: number = 0;
  // 中位数销售额
  public memmedianAmount: number = 0;
  // 销售额百分比
  public mempercentage: string = '';
  // 上一名
  public memdistanceLast: number = 0;
  // 与第一名相差
  public memdistanceFirst: number = 0;
   // 本身的storeId
   public storeId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
      this.appService.getItem('curStore',val=>{
        this.storeId=val['id']
        console.log(this.storeId)
      })
    this.RankingData(this.i)
  }
  Store() {
    this.i = 1;
    this.data = [];
    this.monthly = [];
    this.content.scrollToTop(0);
    this.refresh=true;
    this.RankingData(this.i, this.storeSelected);
  }

  doInfinite($event) {
    this.RankingData(this.i, this.storeSelected, $event);
  }
  RankingData(i: number, storeId?, $event?): void {
    this.appService.httpPost('findStoreSortAnalysis.api',
     Object.assign({},{ page: i, 'storeId': storeId?Number(storeId):Number(this.storeId),rows:20})
     , data => {
      console.log(data);
      this.type = data['type'];
      if (data.code != 1) {
        this.appService.alert(`${data.msg}`)
      }
      if (data['type'] == 2) {
        this.refresh = false;
        this.shopperRanking = data['sort'] || 1;
        this.averageAmount = data['averageAmount'] | 0;
        this.userAmount = data['sumAmount'] || 0;
        this.medianAmount = data['medianAmount'] || 0;
        this.distanceFirst = data['distancefirst'] || 0;
        this.distanceLast = data['distanceLast'] || 0;
        this.percentage = '' + (data['percentage'] || 0) + '%';
        this.memshopperRanking = data['memsort'] || 1;
        this.memaverageAmount = data['memaverageAmount'] | 0;
        this.memuserAmount = data['memsumAmount'] || 0;
        this.memmedianAmount = data['memmedianAmount'] || 0;
        this.memdistanceFirst = data['memdistancefirst'] || 0;
        this.memdistanceLast = data['memdistanceLast'] || 0;
        this.mempercentage = '' + (data['mempercentage'] || 0) + '%';
        console.log(this.percentage)
      }
      if (data['type'] == 1) {
        if (i == 1) {
          //  重置content大小
          this.content.resize();
          this.OrgUser();
          //  第一页
          this.total = data['totalMap'] || {};
          data['day'].forEach(element => {
            this.monthly.unshift(element.substr(-2).replace(/0/, ''))
          })
        }
        if (data['data'].length >= 20) {
          this.data =[...this.data,...data['data']||[]]
          
          this.i++;
        } else {
          this.data =[...this.data,...data['data']||[]]
          this.refresh = false;
        }
        if ($event) {
          $event.complete();
        }
      }
    },true)
  }
  // 判断是否为燕子坊总部
  OrgUser() {
    this.appService.httpPost('findOrgUser.api', { storeId: '' }, data => {
      console.log(data)
      this.storeMap = data['orgMap'] || [];
      this.storeMapLength = this.storeMap.length > 0 ? true : false;;
    })
  }
}
