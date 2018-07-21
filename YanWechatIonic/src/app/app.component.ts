import { Component } from '@angular/core';
import { Platform,ToastController, Nav, IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppService } from '../providers/service-public-service/service-public-service';
import { Keyboard } from '@ionic-native/keyboard';
import { ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from '../providers/NativeService';
import { Events } from 'ionic-angular';
import { VersionService } from '../providers/VersionService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  backButtonPressed: boolean = false;
  constructor(
    public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    protected appservice:AppService,
    protected keyboard:Keyboard,
    public toastCtrl: ToastController,
    public ionicApp: IonicApp,
    public geolocation:Geolocation,
    public nativeService:NativeService,
    private events: Events,
    public versionService:VersionService
  ) {
    platform.ready().then(() => {
      let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
      this.geolocation.getCurrentPosition(options).then((resp) => {
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      
      statusBar.overlaysWebView(true);
      // this.registerBackButtonAction();
      statusBar.backgroundColorByHexString('#ffffff');
      setTimeout(()=>{
        splashScreen.hide();
      },1000)
      // screen.orientation.lock('portrait-primary')
      this.keyboard.hideKeyboardAccessoryBar(false);
      this.keyboard.disableScroll(true);
      this.versionService.checkVersion();

      this.appservice.getItem('userInfo',(val) => {
        if(val&&val==1){
          this.nav.setRoot('LoginPage');
          this.registerBackButtonAction(); // 注册android返回按键事件
          return;
        };
        if (val&&val!=1) {
          var obj=null;
          this.appservice.getItem('user',val=>{
            obj =val
           })
          this.appservice.httpPost('login_submit.api',obj,data => {
            console.log(data);
            if (data.code == -1) {
               this.appservice.toast(data.msg);
               this.nav.setRoot('LoginPage')
               this.registerBackButtonAction(); // 注册android返回按键事件

            }else{
              this.appservice.setItem('driverToken',data.map.driverToken);
              this.appservice.setItem('userInfo',data.map);
              this.nav.setRoot('TabsPage')
              this.registerBackButtonAction(); // 注册android返回按键事件

            }
          });
         
        }else{
          this.nav.setRoot('LoginPage')
        }
      });

    });
  }
  ionViewDidLoad(){
    
  }
  registerBackButtonAction() {
   this.keyboard.close();
   console.log(1)
   console.log(this.nav.getActiveChildNavs()[0])
    this.platform.registerBackButtonAction(() => {
      this.events.publish('android:backButtonAction');
      // 如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        console.log(activePortal)
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      const childNav = this.nav.getActiveChildNavs()[0]; // 获取tabs导航,this.nav是总导航,tabs是子导航
      if (!childNav) {
        this.nativeService.minimize();
        return;
      }
      const tab = childNav.getSelected(); // 获取选中的tab
      const activeVC = tab.getActive(); // 通过当前选中的tab获取ViewController
      const activeNav = activeVC.getNav(); // 通过当前视图的ViewController获取的NavController
      return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();
    }, 1);
  }
}
