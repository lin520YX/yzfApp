import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { ActionSheetController } from 'ionic-angular';
import { AppShare } from '../../../publics/share';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the CompanyInfoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-info-detail',
  templateUrl: 'company-info-detail.html',
})
export class CompanyInfoDetailPage {
  @ViewChild(Content) content: Content;
  public CompanyInfoDetailData: any = '';
  public CreateDate: any = '';
  share: Object = {};
  // 默认不能分享
  public relay = 2;
  public infoContent;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    public actionSheetCtrl: ActionSheetController,
    public appShare: AppShare,
    private sanitizer: DomSanitizer
  ) {
    this.companyInfoDetail(this.navParams.get('id'))
    this.share = { intormationId: this.navParams.get('id') }
    this.appservice.getItem('userInfo', val => {
      this.share['userId'] = val['id'];
    })
    this.appservice.getItem('curStore', val => {
      this.share['storeId'] = val['id'];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInfoDetailPage');
  }
  companyInfoDetail(id) {
    console.log(id)
    this.appservice.httpPost('getInformation.api', { intormationId: id }, data => {
      console.log(data)
      this.CompanyInfoDetailData = data.map.data;
      this.infoContent=this.sanitizer.bypassSecurityTrustHtml(this.CompanyInfoDetailData['contents'])
      this.CreateDate = data.map.data.startTime.time;
      this.relay=data.map.data.relay
      console.log(this.relay)
    }, true)
  }
  gobefore() {
    this.content.scrollToTop(0)
  }
  openModal() {
    let str = '';
    for (var attr in this.share) {
      str = str + '&' + attr + '=' + this.share[attr]
    }
    
    let actionSheet = this.actionSheetCtrl.create({
      title: '分享燕之坊资讯到微信',
      buttons: [
        {
          text: '微信好友',
          handler: () => {
            this.weshare((r)=>{
               if(r){
                 if(this.relay==1){
                  this.appShare.wxShare(`${this.CompanyInfoDetailData.title}`, 0, `${this.CompanyInfoDetailData.remark}`, '', `http://hyxt.yanzhifang.com/app/wechatshare/share.html?${str.substring(1, str.length)}`)

                 }else{
               this.appservice.alert(`该资讯不能分享`);
                 }
            }else{
              this.appservice.alert(`该资讯不能分享`);
            }
            })
           
          }
        },
        {
          text: '朋友圈',
          handler: () => {
            this.weshare((r)=>{
             if(r){
               console.log(this.relay)
               if(this.relay==1){
                this.appShare.wxShare(`${this.CompanyInfoDetailData.title}`, 1, `${this.CompanyInfoDetailData.remark}`, '', `http://hyxt.yanzhifang.com/app/wechatshare/share.html?${str.substring(1, str.length)}`)
               }else{
                this.appservice.alert(`该资讯不能分享`);
               }
            }else{
              this.appservice.alert(`该资讯不能分享`);
            }
           })
            
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  weshare(cb):any{
    this.appservice.httpPost('shareInformation.api',{
      intormationId:this.navParams.get('id')
    },data=>{
      
      var orShare=data.code==1?true:false;
      cb(orShare)
    })
  }
}
