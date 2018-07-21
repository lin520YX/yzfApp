import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the MenuAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface ReturnType{
  name:string;
  id:number;
}
export interface MenuAnalysisType{
  typeId:number
}
export interface ListTypeModel{
  name:string;
  memberNum:any;
  returnNum:any;
  succNum:any;
  rate:any;
}
@IonicPage()
@Component({
  selector: 'page-menu-analysis',
  templateUrl: 'menu-analysis.html',
})

export class MenuAnalysisPage {
  public typeItem:Array<ReturnType>=[];
  public storeSelected:any;
  public menuData:ListTypeModel[]=[];
  public k:any;
  public typeItemMore=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService:AppService) {
      appService.httpPost('findMemberReturnProjectType',{userId:'',storeId:''},data=>{
        if(data.code==1){
          this.typeItem=data['data'];
          this.typeItemMore=this.typeItem.length>0?true:false;
          this.storeSelected=data['data'][0]['id']
          this.menuAnalysis({typeId:this.storeSelected})
        }
      })
  }
  menuAnalysis(type:MenuAnalysisType){
    this.appService.httpPost('findMemberReturnAnalysis',type,data=>{
      if(data.code==1){
          this.menuData=data['data']||[];
      }else{
        this.appService.alert(`${data.msg}`)
      }
    },true)
  } 
  changeType(){
    if(this.k==this.storeSelected){
      return;
    }else{
      this.menuData=[] as ListTypeModel[];
      this.menuAnalysis({typeId:this.storeSelected});
      this.k=this.storeSelected;
    }
   
  }

}
