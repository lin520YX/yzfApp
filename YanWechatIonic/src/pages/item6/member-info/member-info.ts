import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the MemberInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html',
})
export class MemberInfoPage {
  @ViewChild(Content) content: Content;
  // 会员等级
  public vipType:string='';
  //会员性别
  public sexNum=0;
  // 累计积分
  public accNum:number=0;
  // 可用积分
  public nowAccNum:number=0;
  // 已用积分
  public decNum:number=0;
  // 微信绑定
  public weixinbd:boolean;
  // 会员姓名
  public memberName:string;
  // 会员性别
  public memberSex:string;
  // 生日
  public memberBirthday:string='';
  // 地址
  public memberAddress:string;
  // 电话
  public phone:number;
  // 生日修改
  public memberBirthdayOnlyOnce:string='';
  // boolean 是否可以修改生日
  // modifybirthday;
  public modifyBrithday;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public appservice:AppService,
    public alertCtrl:AlertController,
   public actionSheetCtrl:ActionSheetController) {
    this.appservice.httpPost('getMemderInfo.api',{
      memberId:this.navParams.get('memberId')},data=>{
        console.log(data)
      this.vipType=data['data']['vipType']||'注册会员';
      this.accNum=data['data']['accNum']||0;
      this.nowAccNum=data['data']['nowAccNum']||0;
      this.decNum=data['data']['decNum']||0;
      this.weixinbd=data['data']['openId']?true:false;
      this.memberName=data['data']['name']||'';
      this.memberSex=data['data']['sex']||'';
      this.memberBirthday=  data['data']['birthdayTime']||''
      this.modifyBrithday=data['data']['whether'];
      
      if(this.memberSex=='男'||''){
        this.sexNum=0;
      }else{
        this.sexNum=1;
      }
      this.memberAddress=data['data']['address']||'';
      this.phone=data['data']['phone']||'';
    },true)
  }
  sheet(){
    console.log(1)
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择性别',
      buttons: [
        {
          text: '男',
          role: 'destructive',
          handler: () => {
          this.sexNum=0;
          this.memberSex='男'
          }
        },{
          text: '女',
          handler: () => {
            this.sexNum=1;
            this.memberSex='女'
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  submit(){
    if(this.memberSex!='女'){
      if(this.memberSex!='男'){
        this.appservice.alert(`请输入正确性别男或女`);
        return;
      }
    }
    let alert = this.alertCtrl.create({
      title: '请确认是否修改会员资料',
      buttons: [
        {
          text: '确定',
          handler: data => {
                this.appservice.httpPost('memberInfoUpdate.api',{
                  storeId:'',
                  userId:'',
                  memberId:this.navParams.get('memberId'),
                  name:this.memberName,
                  sex:this.sexNum,
                  vipAdd:this.memberAddress,
                  birthdayTime:this.memberBirthday||this.memberBirthdayOnlyOnce
                },r=>{
                  if(r.code==1){
                    this.modifyBrithday=false;
                    this.appservice.alert(r.msg);
                  }else{
                    this.appservice.alert(r.msg);
                  }
                })
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberInfoPage');
  }

}
