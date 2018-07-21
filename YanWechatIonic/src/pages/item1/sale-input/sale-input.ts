import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SaleInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-input',
  templateUrl: 'sale-input.html',
})
export class SaleInputPage {
  protected data:any;
  protected total:any=0;
  protected saleAmount:any;
  @ViewChild(Navbar)navbar:Navbar;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService,
    public platform : Platform) {
  }

  ionViewDidLoad() {   
    this.data=this.navParams.get('data');
    console.log(this.data)
    this.saleAmount=this.data['saleAmount'];
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
  perfectInfo(){
    this.navCtrl.push('MemberMainPage',{id:this.data['memberId']})

  }

}
