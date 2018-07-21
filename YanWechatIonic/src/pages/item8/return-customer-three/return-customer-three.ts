import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Content } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
export class SaleRecord{
  categoryName:string;
  goodsName:string;
  goodsStates:string;
  salePrice:number;
  saleQty:number;
}
/**
 * Generated class for the ReturnCustomerThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-customer-three',
  templateUrl: 'return-customer-three.html',
})
export class ReturnCustomerThreePage {
  @ViewChild(Content)content:Content;
  public memberMessage;
  public phone;
  public name;
  public age;
  public facl;
  public sex:any='男';
  public vipTypeName:any='超级会员'
  public memberId:number;
  public weixin:boolean=false;
  public RecordData=[];
  public RecordIf:boolean=true;
    // 初始状态
    public storeSelected: any = '';
  temp: string;
  memo:string;
  public type=1;
  public saleData:Array<SaleRecord>=[];
  public tradeDate:string;
  public totalAmount:number;
  public saleDateMore:boolean=false;
  public noReturnStatus = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService:AppService,
    public actionSheetCtrl:ActionSheetController) {
      this.type=navParams.get('type');
  }

  ionViewDidLoad() {
   this.appService.httpPost('findMemberDetails',{memberId:this.navParams.get('memberId')},data=>{
      if(data.code==1){
        console.log(data)
        this.memberId=data['memberId']
        this.name=data['memberName'];
        this.phone=data['memberPhone']||'';
        this.weixin=data['weixin']==1?true:false;
        this.vipTypeName=data['garde'];
        this.age=data['age'];
        this.saleData=data['data']||[];
        this.tradeDate=data['tradeDate']||'';
        this.totalAmount=data['totalAmount']||0;
        console.log(this.saleData)
        if(this.saleData.length>=1){
          this.saleDateMore=true;
        }else{
          this.saleDateMore=false;
        }
        if(this.navParams.get('item')){
          this.RecordData.push(this.navParams.get('item'))
        }else{
          this.RecordData=[];
        }
       
        if(this.RecordData.length>=1){
          this.RecordIf=true;
        }else{
          this.RecordIf=true;
        }
        console.log(this.RecordData)
      }else{
        this.appService.alert(`${data.msg}`);
      }
   })
  }
  callPhone(memberPhone) {
    if(!memberPhone){
      <any>window.open('tel:' + this.phone);
      return;
    }else{
      <any>window.open('tel:' + memberPhone);
    }
 
  }
  memberInfo(){
    if(!this.memberId){
      return;
    }
    this.navCtrl.push('MemberInfoPage',{memberId:this.navParams.get('memberId')})
  }
  ConsumptionRecord(){
    if(!this.memberId){
      return;
    }
    this.navCtrl.push('ConsumptionRecordPage',{memberId:this.navParams.get('memberId')})
  }
  MarkExchange(){
    if(!this.memberId){
      return;
    }
    this.navCtrl.push('MarkRecordPage',{memberId:this.navParams.get('memberId')})
  }
  ExchangeRecord(){
    if(!this.memberId){
      return;
    }
    this.navCtrl.push('ExchangeRecordPage',{memberId:this.navParams.get('memberId')})
  }
  trackingRecord(){
    if(!this.memberId){
      return;
    }
    this.navCtrl.push('TrackingRecordPage',{memberId:this.navParams.get('memberId')})
  }

  scaling(index, id) {
    if (this.temp === 'show' + id) {
      this.temp = 'hide' + id
    } else {
      this.temp = 'show' +id;
    }
    this.content.resize();
  }
  secondStore(projectId, visitId, memberId,index){
    const item = this.RecordData.filter(v => {
      return v['visitId'] == visitId
    })[0]
    console.log(item['returnContent'])
    // 回访内容拼接成字符串
    let str = '';
    item['returnContent'].forEach(v => {
      if (v['checked'] == true) {
        str = str + v['name'] + ','
      }
    })
    console.log(str)
    if(!this.storeSelected){
      this.appService.alert(`请选择回访结果`);
      return;
    }
    this.appService.httpPost('memberReturnEntrySubmit'
      ,
      {
        memberId: memberId,
        projectId: item['projectId'],
        visitId: item['visitId'],
        content: str,
        resultId: this.storeSelected,
        status: this.noReturnStatus,
        remark: this.memo
      }
      , data => {
        console.log(this.noReturnStatus)
        if (data.code == 1) {
          console.log(data)
          this.appService.alert(`${data.msg}`)
         if(this.noReturnStatus==0){
          // this.temp = 'hide' + visitId;
         }else{
          this.RecordIf=false;
          this.RecordData=[];
         }
        } else {
          this.appService.alert(`${data.msg}`)
        }
      }, true)
  }
  contentTap(visitId, name) {
    this.RecordData.filter(v => {
      return v['visitId'] == visitId
    })[0]['returnContent'].forEach(ele=> {
      if(ele['name']==name){
        if (ele['checked'] == 'false') {
          ele['checked'] = true;
        } else {
          ele['checked']= 'false';
        }
      }
    });
  }
}
