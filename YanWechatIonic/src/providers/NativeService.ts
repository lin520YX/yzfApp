import {Injectable} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {InAppBrowser} from '@ionic-native/in-app-browser';
// import { APK_DOWNLOAD,APP_DOWNLOAD } from '../publics/Constants';
import { Observable } from 'rxjs/Observable';
import { AppMinimize } from '@ionic-native/app-minimize';

@Injectable()
export class NativeService {
  private v=null;
  private appType;
  private appUrl;
  private appV;
  constructor(private platform: Platform,
              private alertCtrl: AlertController,
              private appVersion: AppVersion,
              public inAppBrowser: InAppBrowser,
              private appMinimize:AppMinimize) {
  }
 
  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url:string):void {
    this.inAppBrowser.create(url, '_system');
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
  getVersionNumber(): Observable<string> {
    return Observable.create(observer=>{
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        console.log('getVersionNumber:' + err);
      });
    })
  }
  
   /**
   * 获得app包名
   * @description  对应/config.xml中id的值
   * @returns {Promise<string>}
   */
  getPackageName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getPackageName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error(false);
      });
    });
  }
   /**
   * 获得app name,如现场作业
   * @description  对应/config.xml中name的值
   */
  getAppName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getAppName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error(false);
      });
    });
  }
  // 最小化插件
  minimize(): void {
    this.appMinimize.minimize()
  }
}