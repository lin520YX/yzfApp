import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the OrderResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-result',
  templateUrl: 'order-result.html',
})
export class OrderResultPage {
  protected data:any;
  protected total:any=0;
  protected saleAmount:any;
  protected orData:any;
  @ViewChild(Navbar)navbar:Navbar;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService,
    public platform : Platform) {
  }

  ionViewDidLoad() {
   
    this.data=this.navParams.get('data');
    this.saleAmount=this.data['saleAmount'];
    console.log(this.data)
    this.orData=JSON.parse(this.data['resultObject'])||[];
    var total=0;
    this.orData['goods'].forEach(element => {
      total=total+element['totalPrice']
    });
    this.saleAmount=total;
    console.log(total)
    this.navCtrl.swipeBackEnabled=false;
    
  }
  saleBack(){
    this.appservice.removeItem('saleResult');
    this.appservice.removeItem('bulk');
    this.appservice.removeItem('bulkfull');
    this.appservice.removeItem('bulkleft');
    this.appservice.removeItem('pack');
    this.appservice.removeItem('packfull');
    this.appservice.removeItem('packleft');
    this.appservice.removeItem('sdata');
    this.navCtrl.popToRoot({
      animation: 'md-transition'
    })
  }

  ionViewDidEnter(){
   
    this.platform.registerBackButtonAction(() => {
      this.appservice.removeItem('saleResult');
      this.appservice.removeItem('bulk');
      this.appservice.removeItem('bulkfull');
      this.appservice.removeItem('bulkleft');
      this.appservice.removeItem('pack');
      this.appservice.removeItem('packfull');
      this.appservice.removeItem('packleft');
      this.appservice.removeItem('sdata');
      this.navCtrl.popToRoot({
        animation: 'md-transition'
      })
    });
  }

}
