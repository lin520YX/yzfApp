import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the MarkFinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mark-finish',
  templateUrl: 'mark-finish.html',
})
export class MarkFinishPage {
  public exchangeMark=0;
  public totalMark:number=0;
  public goodsIntegralNum:number=0;
  public keyongNum:Number=0;
  public phone;
  public model:any;
  public receiptNo:string='';
  public time:string='';
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     platform:Platform,
     loading:LoadingController) {
    this.navCtrl.swipeBackEnabled=false;
    let data:Array<any>=[];
    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('success');
      }, 2000);
    });
    let load = loading.create({ spinner: 'bubbles' });
    load.present();
    promise1.then(()=>{
      data=this.navParams.get('data')
      console.log(data)
    }).then(()=>{
      load.dismiss();
      this.goodsIntegralNum=data['goodsIntegralNum']||0;
      this.keyongNum=data['keyongNum']||0;
      this.model=JSON.parse(data['model']);
      this.receiptNo=data['receiptNo']||'';
      this.time=data['time'].substr(0,10)||'';
      this.phone=data['phone']||'';
    
    })

  }
  MarkBack(){
    this.navCtrl.popToRoot({
      animation: 'md-transition'
    })
  }

}
