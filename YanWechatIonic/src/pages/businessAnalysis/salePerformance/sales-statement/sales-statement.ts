import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SalesStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-statement',
  templateUrl: 'sales-statement.html',
})
export class SalesStatementPage {
  private storeSelected : string = ''; //全部门店
  protected data = {};
  private storeMap = [];
  protected salesStatementDetail;
  protected params1;
  protected params2;
  protected params3;
  protected params4;
  protected params5;
  protected params6;
  protected params7;
  protected params8;
  protected params9;
  protected typeName:string='销售业绩';
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public apps: AppService) {
      this.params1={
        type:1,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params2={
        type:2,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params3={
        type:3,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params4={
        type:4,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params5={
        type:5,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params6={
        type:6,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params7={
        type:7,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params8={
        type:8,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.params9={
        type:9,
        storeId:this.storeSelected,
        typeName:this.typeName
      }
      this.salesStatementDetail='SalesStatementDetailPage';
      // this.apps.httpPost('findOrganization.api',{storeId:''},data=>{
      //   console.log(data)
      //   this.storeMap = data.storeMap;
      // },false)
      this.apps.httpPost('findUserOrgStore.api',{storeId:''},data=>{
        console.log(data)
        this.storeMap = data['date'];
      },false)
  
  }
  ionViewDidLoad() {
    this.getData();
  }


  changeStore(){
   
   if(!this.storeSelected){
    this.typeName='销售业绩'
    this.storeSelected='';
    this.params1={
      type:1,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params2={
      type:2,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params3={
      type:3,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params4={
      type:4,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params5={
      type:5,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params6={
      type:6,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params7={
      type:7,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params8={
      type:8,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
    this.params9={
      type:9,
      storeId:this.storeSelected,
      typeName:this.typeName
    }
   }
   console.log(this.storeMap) 
    for(let i=0;i<this.storeMap.length;i++){
    
      if(this.storeMap[i]['id']==this.storeSelected){

          this.typeName=this.storeMap[i]['storeName'];
            
      }
      
    }
    
    this.params1={
      type:1,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params2={
      type:2,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params3={
      type:3,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params4={
      type:4,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params5={
      type:5,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params6={
      type:6,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params7={
      type:7,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params8={
      type:8,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.params9={
      type:9,
      storeId:Number(this.storeSelected),
      typeName:this.typeName
    }
    this.getData();

  }

  getData(){
    console.log(this.storeSelected)
  	 this.apps.httpPost('findSalePerfromancestorAnalysis.api',{'storeId':this.storeSelected},data=>{
      console.log(data);
      if (data.code == -1) {
        this.apps.toast(data.msg);
      }else{
        this.data=Object.assign(this.data,data)
      }
    },true)
  }
}
