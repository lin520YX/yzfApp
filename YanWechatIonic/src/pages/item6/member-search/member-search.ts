import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the MemberSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-search',
  templateUrl: 'member-search.html',
})
export class MemberSearchPage {
  public text;
  public memberMsg;
  public memberInfo:Array<any>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService,
 ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSearchPage');
    this.appservice.getItem('memberArray',val=>{
      if(val!=1){
        this.memberInfo=val;
        this.memberMsg=this.memberInfo;
      }
    })
  }
  memberMain(id){
    this.navCtrl.push('MemberMainPage',{id:id})
  }
  search(e){
    if(e.keyCode == 13){
      this.handle();
    }
  }
  handle(){
    if(this.text==undefined||this.text.length!=11){
      this.appservice.toast("请输入11位手机号码")
      return;
    }
    this.appservice.httpPost('getMemberPhone.api',{phone:this.text},data=>{
     
      if(data.code==1){
        this.memberMsg=data.data;
        console.log(data.data)
        if(data['data'].length==0){
          this.appservice.toast('不存在该会员')
        }else{
          if(this.memberInfo.length==0){
            this.memberInfo.push(data.data[0]);
            this.appservice.setItem('memberArray',this.memberInfo);
           
          }else{
             if(!this.filter(data.data[0])){
                if(this.memberInfo.length==5){
                  this.memberInfo.splice(this.memberInfo.length-1,1);
                  this.memberInfo.unshift(data.data[0])
                }else{
                  this.memberInfo.unshift(data.data[0])
                }
                this.appservice.setItem('memberArray',this.memberInfo)
             }
          }
          this.navCtrl.push('MemberMainPage',{id:data['data'][0].id})

        }
      }else{
        this.appservice.toast(data.msg)
      }
    },true)
  }
  filter(a:Object):boolean{
    for(let i=0;i<this.memberInfo.length;i++){
      if(this.memberInfo[i].id==a['id']){
        return true;
      }
    }
  }


}
