import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { Content } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the ShoppersRankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoppers-ranking',
  templateUrl: 'shoppers-ranking.html',
})
export class ShoppersRankingPage {
  @ViewChild(Content) content: Content;
  private storeSelected: string = '';
  public type = false;
  public totalA:string;
  public totalB:string;
  public totalC:string;
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
  public shopperInfoTop:any='0px';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public modal:ModalController) {
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
    this.totalA='';
    this.totalB='';
    this.totalC='';
    this.RankingData(this.i, this.storeSelected);
  }

  doInfinite($event) {
    this.RankingData(this.i, this.storeSelected, $event);
  }
  RankingData(i: number, storeId?, $event?): void {
    
    const obj={ page: i, 'storeId': storeId?Number(storeId):Number(this.storeId),rows:20}
    this.appService.httpPost('lookGuideSalesRankings.api', obj, data => {
      console.log(data);
      this.type = data['type'];
      if (data['type'] == 2) {
        this.refresh = false;
        this.shopperRanking = data['sort'] || 1;
        this.averageAmount = data['averageAmount'] || 0;
        this.userAmount = data['sumAmount'] || 0;
        this.medianAmount = data['medianAmount'] || 0;
        this.distanceFirst = data['distancefirst'] || 0;
        this.distanceLast = data['distanceLast'] || 0;
        this.percentage = '' + (data['percentage'] || 0) + '%';
        this.memshopperRanking = data['memsort'] || 1;
        this.memaverageAmount = data['memaverageAmount'] || 0;
        this.memuserAmount = data['memsumAmount'] || 0;
        this.memmedianAmount = data['memmedianAmount'] || 0;
        this.memdistanceFirst = data['memdistancefirst'] || 0;
        this.memdistanceLast =  data['memdistanceLast'] || 0;
        this.mempercentage = '' + (data['mempercentage'] || 0) + '%';
      }
      if (data['type'] == 1) {
        if (i == 1) {
          //  重置content大小
          this.OrgUser();
          this.content.resize();
          //  第一页
          this.totalA = data['A'];
          this.totalB = data['B'];
          this.totalC = data['C'];
          data['day'].forEach(element => {
            this.monthly.unshift(element.substr(-2).replace(/0/, ''))
          })
        }
        if (data['guideSorts'].length >= 20) {

          this.data =[...this.data,...data['guideSorts'] || []]
          this.i++;
          if ($event) {
            $event.complete();
          }
        } else {
          this.data =[...this.data,...data['guideSorts'] || []]
          this.refresh = false;
        }
      }
    },true)
  }
  // 判断是否为燕子坊总部
  OrgUser() {
    this.appService.httpPost('findOrgUser.api', {}, data => {
      this.storeMap = data['orgMap'] || [];
      this.storeMapLength = this.storeMap.length > 0 ? true : false;;
    })
  }
  scanShopInfo(e,f,k){
   let modal= this.modal.create('ShopFromPage',{id:e,storeDesc:f,orgNames:k});
   modal.present();
  }
}
