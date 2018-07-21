import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ShopFromPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-from',
  templateUrl: 'shop-from.html',
})
export class ShopFromPage {
  public name:string;
  public storeDesc:string;
  public orgNames:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public View:ViewController) {
     this.name=navParams.data['id']||'';
     this.storeDesc=navParams.data['storeDesc']||'';
     this.orgNames=navParams.data['orgNames']||'';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopFromPage');
  }
  ViewDisplay(){
    this.View.dismiss();
  }
}

