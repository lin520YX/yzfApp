import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the MarkExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mark-exchange',
  templateUrl: 'mark-exchange.html',
})
export class MarkExchangePage {
  @ViewChild(Content)content:Content
  public menus:Array<any>=[];
  public oneDatas= new Array();
  public towDatas= new Array();
  public threeDatas= new Array();
  public dataList= new Array();
  public menuIndex=0;
  public phone = '';
  public mark=false;
  public canUseMark;
  public cumulativeMark;
  public usedMark;
  public srollEvent$=null;
  defaultImage='assets/imgs/default.png';
  offset=10;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apps:AppService,
    public apiUrl:AppGlobal ) {
    this.srollEvent$ = Observable.fromEvent(document.getElementById('containe'), 'scroll')
    this.menuIndex=0;
    this.menus=[{name:'禅食',id:1},{name:'粗粮',id:2},{name:'定制',id:3}];
    if(navParams.get('phone')){
      this.phone=navParams.get('phone')+'';
      this.findMemberIntegral()
    }
  }
  goodsSelect(i) {
    console.log(this.menuIndex)
// 处理选中事件
    if (this.menuIndex == 0) {
      // 禅食  
      console.log('禅食  ')
      if(this.oneDatas[i]['sale']<0){
        this.apps.toast('该商品不在您的经营范围');
        return;
      }
      if(this.oneDatas[i]['checked']==false){
        this.oneDatas[i]['checked']=true
      }else{
        this.oneDatas[i]['checked']=false
      }
    }else  if(this.menuIndex == 1){
      // 养生
      console.log('养生')
      console.log(this.towDatas[i])
      if(this.towDatas[i]['sale']<0){
        this.apps.toast('该商品不在您的经营范围');
        return;
      }
      console.log(this.towDatas[i]['checked'])
      if(this.towDatas[i]['checked']==false){
        this.towDatas[i]['checked']=true
      }else{
        this.towDatas[i]['checked']=false
      }
    }else{
      console.log('定制 ')
        if(this.threeDatas[i]['sale']<0){
          this.apps.toast('该商品不在您的经营范围');
          return;
        }
        console.log(this.threeDatas[i])
        if(this.threeDatas[i]['checked']==false){
          this.threeDatas[i]['checked']=true
        }else{
          this.threeDatas[i]['checked']=false
        }
      
    }
  }
  ionViewDidLoad() {
    this.apps.httpPost('findIntegralExchangeGoods.api',{},data=>{
      console.log(data);
      
      if(data.code==-1){
        this.apps.alert(data.msg);
        this.navCtrl.popToRoot()
      }else{
        this.oneDatas = this.checked(data.data['chanshi']);
        this.towDatas = this.checked(data.data['yangsheng']);
        this.threeDatas = this.checked(data.data['dingzhi']);
        this.dataList = this.oneDatas;
      }
    },true)
  }
  checked(resource){
    resource.forEach(element => {
      element=Object.assign(element,{
        'checked':false
      })
    });
    return resource||[]
  }
  findMemberIntegral(){
    if(!this.phone.length){
      this.apps.toast('手机号不能为空');
      return;
    }

    if(this.phone.length==11){
      this.apps.httpPost('findMemberIntegral.api',{phone:this.phone},data=>{
        console.log(data)
          if(data.code==1){
            this.mark=true;
            this.canUseMark=data.data.keyong;
            this.cumulativeMark=data.data.yiyong;
            this.usedMark=data.data.leiji;
            // 重新计算content的大小
            this.content.resize();
          }else{
            this.mark=false;
            this.content.resize();
            this.apps.toast(data.msg);
          }
      },true)
    }else{
      this.apps.toast('手机号格式有误');
    }
    
  }
  markChange(i){
    console.log(i)
  }

  selectPageMenu(index){
    this.menuIndex = index;
    this.dataList=[];
    if (index == 0) {
      this.dataList = this.oneDatas;
       // 重新计算content的大小
       this.content.resize();
    }else if(index==1){
      this.dataList = this.towDatas;
       // 重新计算content的大小
       this.content.resize();
    }else{
      this.dataList=this.threeDatas;
      this.content.resize();
    }
  }
 
/**
 * @method() 提交
 * @returns void
 * */ 
  submit(){
    if (!this.mark) {
      this.findMemberIntegral();
      return;
    }

    var goodsList = new Array();
    var exchangeVals = 0;
    this.oneDatas.forEach(el=>{
      if(el['checked']){
          exchangeVals+=el['exchangeVal']
          goodsList=[...goodsList,{
            'name':el['goodsName'],
            'goodsNo':el['goodsNo'],
            'number':1,
            'exchangeVal':el.exchangeVal
          }]
      }
    })
    this.towDatas.forEach(el=>{
      if(el['checked']){
          exchangeVals+=el['exchangeVal']
          goodsList=[...goodsList,{
            'name':el['goodsName'],
            'goodsNo':el['goodsNo'],
            'number':1,
            'exchangeVal':el.exchangeVal
          }]
      }
    })
    this.threeDatas.forEach(el=>{
      if(el['checked']){
          exchangeVals+=el['exchangeVal']
          goodsList=[...goodsList,{
            'name':el['goodsName'],
            'goodsNo':el['goodsNo'],
            'number':1,
            'exchangeVal':el.exchangeVal
          }]
      }
    })
    if (goodsList.length == 0) {
      this.apps.toast('请选择兑换礼品');
      return;
    }
    console.log(goodsList)

    this.navCtrl.push('MarkVerifyPage',{'goodsJson':goodsList,'phone':this.phone,'exchangeVals':exchangeVals,'canUseMark':this.canUseMark},{
      animation:'md-transition'
    })
  
  }
}
