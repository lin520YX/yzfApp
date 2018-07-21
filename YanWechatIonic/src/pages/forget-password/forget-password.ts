import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service'
import { ParamsPublic } from '../../publics/public';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  securityCodeTime = 0;

  constructor( 
  	public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    protected Params:ParamsPublic) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  submit(value:any){

    var _father = this;

    if (value.phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }else if (!value.password) {
      this.appService.alert('请输入密码！');
      return;
    }else if (!value.code) {
      this.appService.alert('请输入验证码！');
      return;
    }
  
    this.appService.httpPost('forgetPassword.api',{
      'phone': value.phone,
      'password': value.password,
      'newPassword': value.password,
      'smsCode': value.code
    },data => {
      if (data.code == -1) {
         _father.appService.toast(data.msg);
      }else{
      	_father.appService.toast("操作成功！");
        _father.navCtrl.pop();
      }
    },true);

  }

  sendCode(phone:any){
    
    if (this.securityCodeTime > 0 ) {
      return;
    }

    var _father=this;

    if (phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }

    this.appService.httpPost('getUserPhone.api',
    {phone:phone,
    }
    ,data=>{
      if(data.code==1){
        this.appService.toast("手机号尚未注册")
      }else{
        this.appService.httpPost('get_phone_code.api',  {phone:phone,
          'code':'2'},data => {
          console.log(data);
          if (data.code == -1) {
             _father.appService.toast(data.msg);
          }else{
            _father.securityCodeTime = 60;
            var interval = setInterval(()=> {
              _father.securityCodeTime -= 1;
              if (_father.securityCodeTime == 0) {
                  clearInterval(interval);
              }
            },1000);
          }
        },true); 
      }
    })
             

  }

}
