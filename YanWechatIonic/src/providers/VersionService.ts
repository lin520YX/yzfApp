import { NativeService } from "./NativeService";
import { Injectable } from "@angular/core";
import { AppService } from "./service-public-service/service-public-service";
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

@Injectable()
export class VersionService{
    // app版本号
    public appversion_number:any;
    // app类型
    public appType:any;
    // app最新版本
    public appNewVersion_number:any;
    // app下载地址
    public appUrl:any;
    // 强制更新
    public mandatoryRefreshVersion:any;
    constructor(
        public nativeService:NativeService,
        public appService:AppService,
        public alertCtrl:AlertController,
        private file: File,
        private fileOpener: FileOpener,
        private transfer: FileTransfer,){

    }
    checkVersion(){
        // 如果不是手机设备 不检测版本号
        if(!this.nativeService.isMobile()){
            return;
        }
        // 获取app版本号
        this.appType=this.nativeService.isAndroid()?'android':'ios';
        this.nativeService.getVersionNumber().subscribe(appVersionNumber=>{
            this.appversion_number=appVersionNumber;
            // 从后台获取app 版本号以及地址
            this.appService.httpPost('appVersionUpdate',{osType:this.appType},data=>{
                this.mandatoryRefreshVersion=data.version['mandatory']||2?false:true;
                console.log(data)
                if(data.code!=1){
                    this.appService.alert('从服务器中获取版本失败');
                    return;
                }
                this.appNewVersion_number=data.version['v']||'';
                this.appUrl=data.version['url']||''; 
                // 比较版本
                if(this.appNewVersion_number>this.appversion_number){
                    this.appService.toast('检测到更新信息');
                    if(this.mandatoryRefreshVersion){
                        this.alertCtrl.create({
                            title: '重要升级',
                            subTitle: '您必须升级后才能使用！',
                            enableBackdropDismiss: false,
                            buttons: [{
                              text: '确定', handler: () => {
                                this.downloadApp();
                              }
                            }
                            ]
                          }).present();
                    }else{
                        this.alertCtrl.create({
                            title: '升级',
                            subTitle: '发现新版本,是否立即升级？',
                            enableBackdropDismiss: false,
                            buttons: [{ text: '取消' }, {
                              text: '确定', handler: () => {
                                this.downloadApp();
                              }
                            }]
                          }).present();
                    }
                }
            })
        })

    }
     /**
   * 下载安装app
   */
  downloadApp() {
    if (this.nativeService.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();
  
      const fileTransfer: FileTransferObject  = this.transfer.create();
      const apk = this.file.externalRootDirectory + 'download/' +  'yan.apk'; //apk保存的目录
      fileTransfer.download(this.appUrl, apk).then(() => {
       this.fileOpener.open(apk,'application/vnd.android.package-archive');
      }, err => {
        alert && alert.dismiss();
        this.alertCtrl.create({
          title: '前往网页下载',
          subTitle: '本地升级失败',
          buttons: [{
            text: '确定', handler: () => {
              this.nativeService.inAppBrowser.create(this.appUrl, '_system');
            }
          }]
        }).present();
      });
      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = <any>document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
    if (this.nativeService.isIos()) {
      this.alertCtrl.create({
        title: '升级',
        subTitle: '发现新版本,是否立即升级？',
        enableBackdropDismiss: false,
        buttons: [{ text: '取消' }, {
          text: '确定', handler: () => {
            this.nativeService.openUrlByBrowser(this.appUrl);
          }
        }]
      }).present();
      
    }
  }
    
}