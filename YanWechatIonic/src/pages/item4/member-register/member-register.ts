import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-member-register',
  templateUrl: 'member-register.html',
})
export class MemberRegisterPage {
  @ViewChild(Content) content: Content;
  i=3;
  private member={
    phone:'',
    // smsCode:'',
    birthdayDate:'',
    name:'',
    sex:''
  }
  public sexholder:any='请选择性别'
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService:AppService,
    // public actionSheetCtrl: ActionSheetController
  ) {
  }

  // 性别选择按钮
  sex(i){
    this.i=i;
  }
 // 提交
  submit(){
   
    console.log(this.member)
    if(!this.member['phone']){
      this.appService.alert('手机号码不能为空');
      return false
    }
    // 验证手机号码
    if(this.member['phone'].length!=11){
      this.appService.alert('手机号码填写错误，请检查');
      return false
    }
    const newD=new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate())
    if(this.member['birthdayDate']>newD){
      this.appService.alert(`注册时间要小于当前时间`);
     return false;
    }
    if(this.i==3){
      this.appService.alert(`请选择性别`);
      return; 
    }
    this.member['sex']=''+this.i;
    
    this.appService.httpPost('memder_submit.api',this.member,
    data=>{
      console.log(data)
      if(data.code==1){
        this.appService.alert(data.msg)
        this.navCtrl.push('MemberMainPage',{id:data['data']['memberId']})
        this.member={
          phone:'',
          // smsCode:'',
          birthdayDate:'',
          name:'',
          sex:''
        }
      }else{
        this.appService.alert(data.msg);
      }
    },true);

  }


}
