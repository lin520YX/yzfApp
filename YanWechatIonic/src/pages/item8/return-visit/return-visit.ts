import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Generated class for the ReturnVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-visit',
  templateUrl: 'return-visit.html',
})
export class ReturnVisitPage {
  public sItems = new BehaviorSubject([]);
  public Items=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
      this.sItems.debounceTime(100).subscribe(val=>{
        this.Items=val
      })
  }

  ionViewDidEnter() {
   

    this.appService.httpPost('findMemberReturnIndex.api', {}, data => {
      console.log(data)
     if(data.code==1){
      this.sItems.next(data['data'] || [] as any[])  
     }   else{
       this.appService.alert(`${data.msg}`);
       this.navCtrl.pop();
     } 
    })
  }
  newCustomerChange(name,id) {
    this.navCtrl.push('NewCustomerChangePage',{name:name,visitId:id})

  }
  menuAnalysis(){
    this.navCtrl.push('MenuAnalysisPage')
  }

}
