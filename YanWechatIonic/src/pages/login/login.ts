import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service'
import { ParamsPublic } from '../../publics/public';
import { Keyboard } from '@ionic-native/keyboard';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Navbar) navbar: Navbar;
  @ViewChild(Content) content: Content;

  driverToken = '';

  securityCodeTime = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public platform: Platform,
    public Params: ParamsPublic,
    public event: Events,
    public keyboard: Keyboard,
    public app: App,
    public geolocation: Geolocation) {
      // backButtonService.registerBackButtonAction(null);
    platform.ready().then(() => {
      geolocation.getCurrentPosition().then((resp) => {

      }).catch((error) => {

        console.log('Error getting location', error);
      });
    });
  }
  scrollTokeyboardHeight() {//让content向上滚动 软键盘的高度
    window.addEventListener('native.keyboardshow', (e: any) => {
      this.content.scrollTo(0, e.keyboardHeight);
    });
  }
  focusFun() {
    this.scrollTokeyboardHeight();
  }
  ionViewDidLoad() {
    this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
    this.navCtrl.swipeBackEnabled = false;
    this.appService.getItem('driverToken', (val) => {

      if (val == 1) {

        this.driverToken = '';
      } else {
        this.driverToken = val;
      }
    });
  }
  login(value: any) {

    if (value.phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    } else if (!value.password) {
      this.appService.alert('请输入密码！');
      return;
    }

    const Param = {
      'phone': value.phone,
      'password': value.password
    }
    if (!this.driverToken) {
      if (!value.code) {
        this.appService.alert('请输入验证码！');
        return;
      }
      Param['smsCode'] = value.code;
    } else {
      Param['driverToken'] = this.driverToken;
    }
    this.appService.httpPost('login_submit.api', Param, data => {
      console.log(data);
      if (data.code == -1) {
        this.appService.toast(data.msg);
      } else {
        this.appService.setItem('driverToken', data.map.driverToken);
        this.appService.setItem('userInfo', data.map);
        let keyV = {
          'phone': value.phone,
          'password': value.password,
          'driverToken': data.map.driverToken
        };
        this.appService.setItem('user', keyV);
        this.navCtrl.setRoot('TabsPage');
      }
    }, true);


  }

  sendCode(phone: any) {
    console.log(phone)
    if (this.securityCodeTime > 0) {
      return;
    }


    if (phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }
    const Param1 = {
      'phone': phone,
    }
    const Param2 = {
      'phone': phone,
      'code': '3'
    }
    this.appService.httpPost('getUserPhone.api', Param1, (data) => {
      console.log(1)
      if (data.code == -1) {
        this.appService.httpPost('get_phone_code.api', Param2, (data) => {
          if (data.code == -1) {
            this.appService.toast(data.msg);
          } else {
            this.securityCodeTime = 60;
            var interval = setInterval(() => {
              this.securityCodeTime -= 1;
              if (this.securityCodeTime <= 0) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      } else {
        this.appService.toast("账户不存在！")
      }
    }, true)
  }
  forgetPassword() {
    this.navCtrl.push('ForgetPasswordPage');
  }

}
