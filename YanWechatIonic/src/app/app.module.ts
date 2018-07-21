import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppGlobal, AppService } from '../providers/service-public-service/service-public-service';
import { ParamsPublic } from '../publics/public';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { LazyLoadImageModule } from 'ng-lazyload-image';
// import { AgmCoreModule } from '@agm/core';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { AppShare } from '../publics/share';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import { AppVersion } from '@ionic-native/app-version';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeService } from '../providers/NativeService';
import { AppMinimize } from '@ionic-native/app-minimize';
import { VersionService } from '../providers/VersionService';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicImageViewerModule,
    BrowserModule,
    HttpModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true', //隐藏全部子页面tabs
      backButtonText: '',
      ReactiveFormsModule,
      ios: {
        scrollPadding: false,
        scrollAssist: false,
        autoFocusAssist: false
      },
      android: {
        scrollPadding: true,
        scrollAssist: true,
        autoFocusAssist: true
      }
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDraOE9xDiWo6z5FWrRP3jmEZps-AQT3mU'
    // }),
    // indexDB
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // 静态
    AppGlobal,
    // api public
    AppService,
    // 参数
    ParamsPublic,
    // http
    HttpModule,
    //扫描
    Keyboard,
    Geolocation,
    AppShare,
    PhotoLibrary,
    FileTransfer,
    FileTransferObject,
    File,
    AppVersion,
    FileOpener,
    InAppBrowser,
    NativeService,
    AppMinimize,
    VersionService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
