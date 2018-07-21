import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {
  params:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appService: AppService) {
  console.log(navParams)
   
  }
  submit(value): any{
    
    let pm=value.passwordGroup
    let pmp=pm.password;
    let pmn=pm.newPassword;
   console.log(pmp+'/'+pmn)
    var _father=this;
   if(!pmp|| !pmn){
    this.appService.alert('密码不能为空')
    return;
   }else if(pmp.length<6||pmn.length<6){
    this.appService.alert('密码输入不正确,不能少于6位！')
    return;
   }else{
    this.appService.httpPost('update_password.api',{
      userId:this.navParams.data.id,
      password:pmp,
      newPassword:pmn
    },data => {
      console.log(data);
      if (data.code == -1) {
         _father.appService.toast(data.msg);
      }else{
        _father.appService.toast(data.msg);
        this.navCtrl.pop()
      }
    },true);           

  }

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPasswordPage');
  }

}
