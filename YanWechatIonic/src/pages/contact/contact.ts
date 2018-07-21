import { Component } from '@angular/core';
import { NavController, AlertController, Platform, ToastController, ViewController } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { App } from 'ionic-angular/components/app/app';
import { ImageViewerController } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public userName: string;
  public phone: string;
  public id: string;
  lat: number = null;
  lng: number = null;

  storeName = '';

  storeMap = [];

  backButtonPressed: boolean = false;
  private qrUrl;
  defaultImage = 'assets/imgs/head_portrait.png';
  offset = 0;
  _imageViewerCtrl: ImageViewerController;

  constructor(
    public apps: AppService,
    public navCtrl: NavController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public appCtrl: App,
    public appService: AppService,
    imageViewerCtrl: ImageViewerController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private photoLibrary: PhotoLibrary,
    private actionSheetCtrl: ActionSheetController,
    public viewCtrl:ViewController
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.apps.getItem('userInfo', (val) => {
      console.log(val);
      this.userName = val.userName;
      this.phone = val.phone;
      this.id = val.id;
      this.storeMap = val.storeMap;
    });

    this.apps.getItem('curStore', (val) => {
      this.storeName = val.storeName;
    });
    this.qrcode({});
    //  经纬度转换地名
  }

  qrcode(a) {
    this.appService.httpPost('getUserInfo.api', a, data => {
      console.log(data)

      this.qrUrl = data['map']['qrCodeUrl']
      console.log(this.qrUrl)
    })
  }
  imgPress(url) {
    const imageViewer = this._imageViewerCtrl.create(url);
    imageViewer.present();

    // setTimeout(() => imageViewer.dismiss(), 1000);
    imageViewer.onDidDismiss(() => { });

  }
  pressEvent(url) {

    let actionSheet = this.actionSheetCtrl.create({
      title: '是否保存导购二维码',
      buttons: [
        {
          text: '确定',
          role: 'destructive',
          handler: () => {
            this.photoLibrary.requestAuthorization().then(() => {

              this.photoLibrary.saveImage(url['src'], 'y_Pictrue').then((res) => {
                this.apps.toast('图片保存成功');
              }).catch(e => {
                // this.apps.toast('图片保存失败')
              });
            })
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {


          }
        }
      ]
    });
    actionSheet.present();


    // console.log()
  }

  modifyPsw(): any {
    console.log(this.id);
    this.navCtrl.push('ModifyPasswordPage', { id: this.id })
  }

  logout() {
    window.localStorage.removeItem('userInfo');
    this.appCtrl.getRootNavs()[0].setRoot('LoginPage');
    // this.navCtrl.setRoot();
  }
  Locating() {
    let prompt = this.alertCtrl.create({
      title: '上传门店位置',
      message: "请确认是否在自己负责的门店内，上传后需联系管理员才能修改！",

      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };
            let loading = this.loadingCtrl.create({ spinner: 'bubbles' });
            this.geolocation.getCurrentPosition(options).then((resp) => {
              console.log(resp)
              this.lat = resp.coords.latitude;
              this.lng = resp.coords.longitude;
              if (this.lng) {
                this.apps.httpPost('addStoreLocation.api', {
                  latitude: this.lat,
                  longitude: this.lng
                }, data => {

                  if (data.code == 1) {
                    loading.dismiss();
                    this.apps.toast(data.msg);
                  } else {
                    loading.dismiss();
                    this.apps.toast(`${data.msg}`);
                  }
                  console.log(data)
                })
              } else {
                loading.dismiss();
                this.apps.toast(`获取门店位置超时`);
              }
            }).catch((error) => {
              loading.dismiss();
              this.apps.toast(`上传门店位置失败`);
              console.log('Error getting location', error);
            });
            loading.present();

          }
        }
      ]
    });
    prompt.present();

  }

  close() {
    let prompt = this.alertCtrl.create({
      title: '解除绑定?',
      message: "解除绑定后当前账号可在另一台手机登录!",

      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
           this.removeLogin()

          }
        }
      ]
    });
    prompt.present();
  }
  removeLogin():void{
    this.apps.httpPost('untilDriverToken.api', {
      'userId': this.id
    }, data => {
      console.log(data);
      if (data.code == -1) {
        this.apps.toast(data.msg);

      } else {
        window.localStorage.clear();
        this.apps.toast(data.msg);
        // this.navCtrl.push(LoginPage);
        this.appCtrl.getRootNavs()[0].setRoot('LoginPage');
      }
    }, true);
  }

  showRadio() {

    let alert = this.alertCtrl.create();

    alert.setTitle('选择门店');

    for (var i = 0; i < this.storeMap.length; ++i) {
      alert.addInput({
        type: 'radio',
        label: this.storeMap[i].storeName,
        value: i + '',
        checked: false
      });
    }

    alert.addButton({
      text: '确定',
      handler: data => {

        if (!data) {
          return false;
        }
        var pos = parseInt(data);
        console.log(this.storeMap[pos]['id'])
        this.qrcode({ 'storeId': this.storeMap[pos]['id'] });
        this.storeName = this.storeMap[pos].storeName;
        this.apps.setItem('curStore', this.storeMap[pos])
      }
    });
    alert.present();
  }

}