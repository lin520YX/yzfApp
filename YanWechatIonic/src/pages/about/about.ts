import { Component } from '@angular/core';
import { NavController,Platform,ToastController } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public salesStatement = 'SalesStatementPage';
  public monthlyTask = 'MonthlyTaskPage';
  public salesRecord = 'SalesRecordPage';
  public exchangeRecord = 'ExchangeDataPage';
  public shoppersRanking= 'ShoppersRankingPage';
  public storeRanking = 'StoreRankingPage';
  public zoneRanking= 'ZoneRankingPage';
  // 当月销售额
  public Themonth:any=0;
  // 当月与上月对比
  public ThematchSales:any=0;
  // 销售额环比
  public TheproporSales:any=0;
  // 顾客人数
  public ThenewConsume:any=0;
  // 当月与上月比
  public ThematchConsume:any=0;
  // 顾客人数环比
  public TheproporConsume:any=0;
  // 销售额度单位
  public unit:string='元';
  backButtonPressed: boolean = false;
  // 区域排名控制
  public zoneControl=false;

  public saleUnit='元';

  constructor(
    public apps:AppService,
    public navCtrl:NavController,
    public platform: Platform,
    public toastCtrl: ToastController) {
      this.apps.getItem('userInfo',val=>{
        val['tag']==1?this.zoneControl=true:this.zoneControl=false;
      })
  }
  ionViewWillEnter(){
    this.apps.httpPost('businessAnalysis_index.api',{},data=>{
      console.log(data)
      this.Themonth=(data.data.nowSales+'').length<=5?data.data.nowSales:(data.data.nowSales/10000).toFixed(2)||0;
      this.unit=(data.data.nowSales+'').length<=5?'元':'万元';
      this.ThematchSales=(data.data.matchSales+'').length<=5?data.data.matchSales:(data.data.matchSales/10000).toFixed(2)||0;
      this.saleUnit=(data.data.matchSales+'').length<=5?'元':'万元';
      this.TheproporSales=data.data.proporSales||0;
      this.ThenewConsume=data.data.nowConsume||0;
      this.ThematchConsume=data.data.matchConsume||0;
      this.TheproporConsume=data.data.proporConsume||0;	
    })
  }
}
