import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the NewCustomerChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-customer-change',
  templateUrl: 'new-customer-change.html',
})
export class NewCustomerChangePage {
  @ViewChild(Content) content: Content;
  items: Array<any> = []
  temp: string;
  // 设置默认选中页面
  public tabs: string = '0';
  public title: string = '新客转化';
  // create by linyunfu 
  // 未开始
  public notBegin: number = 0;
  // 已经完成
  public finish: number = 0;
  // 跟进中
  public follow: number = 0;
  // public row 5个数据量
  static ROW_S = 5;
  // 未回访 上啦刷新
  public noReturnMoreData = true;
  // 跟进中 上拉刷新判断
  public followMoreData = true;
  // 完结中 上啦刷新判断
  public finishMoreData = true;
  // 未回访刷新分页
  public NO_RETURN_PAGE = 1;
  // 更进分页
  public FOLLOW_PAGE = 1;
  // 完结分页
  public FINISH_PAGE = 1;
  // 未回访数据
  public noReturnData = [];
  // 更进数据
  public followData = [] as any[];
  // 完结数据
  public finishData = [] as any[];
  // 回访内容
  public returnContent = [] as any[];
  // 回访结果
  public returnResult = [] as any[];
  public memo = '';
  // 初始状态
  public storeSelected: any = '';
  // 判断更近中是否刷新
  public followRefresh = false;
  // 判断完结中是否刷新
  public finishRefresh = false;
  public noReturnStatus = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public appService: AppService) {
    this.title = navParams.get('name')
  }
  ionViewWillEnter() {
    this.items = []
    this.temp = '';
    // 设置默认选中页面
    this.tabs = '0';
    this.title = '新客转化';
    // create by linyunfu 
    // 未开始
    this.notBegin = 0;
    // 已经完成
    this.finish = 0;
    // 跟进中
    this.follow = 0;
    // 未回访 上啦刷新
    this.noReturnMoreData = true;
    // 跟进中 上拉刷新判断
    this.followMoreData = true;
    // 完结中 上啦刷新判断
    this.finishMoreData = true;
    // 未回访刷新分页
    this.NO_RETURN_PAGE = 1;
    // 更进分页
    this.FOLLOW_PAGE = 1;
    // 完结分页
    this.FINISH_PAGE = 1;
    // 未回访数据
    this.noReturnData = [];
    // 更进数据
    this.followData = [] as any[];
    // 完结数据
    this.finishData = [] as any[];
    // 回访内容
    this.returnContent = [] as any[];
    // 回访结果
    this.returnResult = [] as any[];
    this.memo = '';
    // 初始状态
    this.storeSelected = '';
    // 判断更近中是否刷新
    this.followRefresh = false;
    // 判断完结中是否刷新
    this.finishRefresh = false;
    this.noReturnVisit();
    this.content.resize();
    this.content.scrollToTop(0)
  }
  /**
   * @author() linyunfu
   * @method() noReturnVisit
   * @return {void}
   * */
  noReturnVisit() {
    this.appService.httpPost('findMemberReturnTwoPage.api', {
      typeId: this.navParams.get('visitId'),
      state: 0,
      rows: NewCustomerChangePage.ROW_S,
      page: this.NO_RETURN_PAGE
    }, data => {
      if (data.code == 1) {
        console.log(data)
        this.followRefresh = true;
        this.finishRefresh = true;
        this.notBegin = data['notBegin'] || 0;
        this.finish = data['finish'] || 0;
        this.follow = data['follow'] || 0;
        this.noReturnData = [...data['data']];
        for (var i = 0; i < data['data'].length; i++) {
          data['data'][i] = Object.assign(
            data['data'][i],
             { 'returnContent': data['returnContent'] },
             {'returnResult':data['returnResult']},
             {'returnRstatus':[{
              name: '跟进中',
              status: 0
            }, {
              name: '已经结束',
              status: 1
            }]
            }
            )

        }
        if (data['data'].length >= 5) {
          this.noReturnMoreData = true;
          this.NO_RETURN_PAGE++;
        } else {
          this.noReturnMoreData = false;
        }
      } else {
        this.appService.alert(`${data.msg}`)
      }
    })
  }
  /**
  * @author() linyunfu
  * @method() noReturnDoInfinite
  * @description() refresh
  * @return {void}
  * */
  noReturnDoInfinite($event) {
    console.log(this.NO_RETURN_PAGE)
    this.appService.httpPost(
      'findMemberReturnTwoPage.api', {
        typeId: this.navParams.get('visitId'),
        state: 0,
        rows: NewCustomerChangePage.ROW_S,
        page: this.NO_RETURN_PAGE
      },
      data => {
        console.log(data)
        if (data.code == 1) {
          for (var i = 0; i < data['data'].length; i++) {
            data['data'][i] = Object.assign(
              data['data'][i],
               { 'returnContent': data['returnContent'] },
               {'returnResult':data['returnResult']},
               {'returnRstatus':[{
                name: '跟进中',
                status: 0
              }, {
                name: '已经结束',
                status: 1
              }]
              }
              )
          }
          this.noReturnData = this.noReturnData.concat(data['data'] || []);
          console.log(this.noReturnData)
          if (data['data'].length >= 5) {
            this.noReturnMoreData = true;
            this.NO_RETURN_PAGE++;
          } else {
            this.noReturnMoreData = false;
          }
          $event.complete();
          console.log(this.noReturnMoreData)
        }
      }
    )
  }
  /**
  * @author() linyunfu
  * @method() follow
  * @return {void}
  * */
  visitFollow() {
    if (!this.followRefresh) {
      return
    } else {
      this.followData = [] as any[];
      this.FOLLOW_PAGE = 1;
      this.followMoreData = true;
    }
    this.appService.httpPost('findMemberReturnTwoPage.api', {
      typeId: this.navParams.get('visitId'),
      state: 1,
      rows: NewCustomerChangePage.ROW_S,
      page: this.FOLLOW_PAGE
    }, data => {
      if (data.code == 1) {
        console.log(data)
        this.notBegin = data['notBegin'] || 0;
        this.finish = data['finish'] || 0;
        this.follow = data['follow'] || 0;
        this.followData = data['data'] || [];
        for (var i = 0; i < data['data'].length; i++) {
          data['data'][i] = Object.assign(
            data['data'][i],
             { 'returnContent': data['returnContent'] },
             {'returnResult':data['returnResult']},
             {'returnRstatus':[{
              name: '跟进中',
              status: 0
            }, {
              name: '已经结束',
              status: 1
            }]
            }
            )
        }
        console.log(this.followData)
        if (data['data'].length >= 5) {
          this.followMoreData = true;
          this.FOLLOW_PAGE++;
        } else {
          this.followMoreData = false;
        }
        console.log(this.followMoreData)
      } else {
        this.appService.alert(`${data.msg}`)
      }
    })
  }
  /**
  * @author() linyunfu
  * @method() followDoInfinite
  * @description() 用于跟进中 上啦刷新
  * @return {void}
  * */
  followDoInfinite($event) {
    console.log(this.NO_RETURN_PAGE)
    this.appService.httpPost(
      'findMemberReturnTwoPage.api', {
        typeId: this.navParams.get('visitId'),
        state: 1,
        rows: NewCustomerChangePage.ROW_S,
        page: this.FOLLOW_PAGE
      },
      data => {
        console.log(data)
        if (data.code == 1) {
          for (var i = 0; i < data['data'].length; i++) {
            data['data'][i] = Object.assign(
              data['data'][i],
               { 'returnContent': data['returnContent'] },
               {'returnResult':data['returnResult']},
               {'returnRstatus':[{
                name: '跟进中',
                status: 0
              }, {
                name: '已经结束',
                status: 1
              }]
              }
              )
          }
          this.followData = this.followData.concat(data['data'] || []);
          console.log(this.noReturnData)
          if (data['data'].length >= 5) {
            this.followMoreData = true;
            this.FOLLOW_PAGE++;
          } else {
            this.followMoreData = false;
          }
          $event.complete();
        }
      }
    )
  }
  /**
   *  @author() linyunfu
   *  @method() finish
   *  @return{void}
   * */
  visitFinish() {
    console.log(this.followRefresh)
    if (!this.finishRefresh) {
      return
    } else {
      this.finishData = [] as any[];
      this.FINISH_PAGE = 1;
      this.finishMoreData = true;
    }
    this.appService.httpPost('findMemberReturnTwoPage.api', {
      typeId: this.navParams.get('visitId'),
      state: 2,
      rows: NewCustomerChangePage.ROW_S,
      page: this.FINISH_PAGE
    }, data => {
      if (data.code == 1) {
        console.log(data)
        this.notBegin = data['notBegin'] || 0;
        this.finish = data['finish'] || 0;
        this.follow = data['follow'] || 0;
        this.finishData = data['data'] || [];
        if (data['data'].length >= 5) {
          this.finishMoreData = true;
          this.FINISH_PAGE++;
        } else {
          this.finishMoreData = false;
        }
      } else {
        this.appService.alert(`${data.msg}`)
      }
    })
  }
  /**
   *  @author() linyunfu
   *  @method() finishDoInfinite
   *  @return{void}
   * @description{} 用于完结情况上啦刷新
   * */
  finishDoInfinite($event) {
    console.log(this.NO_RETURN_PAGE)
    this.appService.httpPost(
      'findMemberReturnTwoPage.api', {
        typeId: this.navParams.get('visitId'),
        state: 2,
        rows: NewCustomerChangePage.ROW_S,
        page: this.FINISH_PAGE
      },
      data => {
        console.log(data)
        if (data.code == 1) {

          this.finishData = this.finishData.concat(data['data'] || []);
          if (data['data'].length >= 5) {
            this.finishMoreData = true;
            this.FINISH_PAGE++;
          } else {
            this.finishMoreData = false;
          }
          $event.complete();
        }
      }
    )
  }
  /**
 *  @author() linyunfu
 *  @method() 手风琴效果
 *  @return{void}
 * */
  scaling(index, id) {
    if (this.temp === 'show' + id) {
      this.temp = 'hide' + id
    } else {
      this.temp = 'show' + id;
      if (this.tabs == '0') {
        const item = this.noReturnData.filter(v => {
          return v['visitId'] == id
        })[0]['returnContent']
        console.log(item)

        for (let i = 0; i < item.length; i++) {
          item[i]['checked'] = 'false';
        }
      } else {
        const item = this.followData.filter(v => {
          return v['visitId'] == id
        })[0]['returnContent']
        console.log(item)
        for (let i = 0; i < item.length; i++) {
          item[i]['checked'] = 'false';
        }
      }

      this.memo = ''

    }
    this.content.resize();
  }

  /**
   *  @author() linyunfu
   *  @method() 保存回访记录
   *  @return{void}
   * */
  store(projectId, visitId, memberId, index) {
    console.log(index)
    const item = this.noReturnData.filter(v => {
      return v['visitId'] == visitId
    })[0]
    console.log(item['returnContent'])
    // 回访内容拼接成字符串
    let str = '';
    item['returnContent'].forEach(v => {
      if (v['checked'] == true) {
        str = str + v['name'] + ','
      }
    })
    console.log(str)
    if (!this.storeSelected) {
      this.appService.alert(`请选择回访结果`);
      return;
    }
    this.appService.httpPost('memberReturnEntrySubmit'
      ,
      {
        memberId: memberId,
        projectId: item['projectId'],
        visitId: item['visitId'],
        content: str,
        resultId: this.storeSelected,
        status: this.noReturnStatus,
        remark: this.memo
      }
      , data => {
        if (data.code == 1) {
          this.memo = ''
          console.log(data)
          this.noReturnData.splice(index, 1);
          this.temp = 'hide' + visitId;
          this.noReturnStatus = 0;
          this.appService.alert(`${data.msg}`)
          if (this.noReturnStatus == 0) {
            this.visitFollow();
            this.FOLLOW_PAGE = 1;
            this.followData = [];
            this.followRefresh = true;
          } else {
            this.visitFinish();
            this.FINISH_PAGE = 1;
            this.finishData = [];
            this.finishRefresh = true;
          }
          this.storeSelected='';
          item['returnContent'].forEach(v => {
            v['checked'] ='false'
          })
          this.appService.toast(`${data.msg}`)
        } else {
          this.appService.alert(`${data.msg}`)
        }
      }, true)
  }

  /**
   * @author() linyunfu
   * @method() secondStore() 跟进-》完结
   * @return {} void
   * */
  secondStore(projectId, visitId, memberId, index) {
    const item = this.followData.filter(v => {
      return v['visitId'] == visitId
    })[0]
    console.log(item['returnContent'])
    // 回访内容拼接成字符串
    let str = '';
    item['returnContent'].forEach(v => {
      if (v['checked'] == true) {
        str = str + v['name'] + ','
      }
    })
    console.log(str)
    if (!this.storeSelected) {
      this.appService.alert(`请选择回访结果`);
      return;
    }
    this.appService.httpPost('memberReturnEntrySubmit'
      ,
      {
        memberId: memberId,
        projectId: item['projectId'],
        visitId: item['visitId'],
        content: str,
        resultId: this.storeSelected,
        status: this.noReturnStatus,
        remark: this.memo
      }
      , data => {
        if (data.code == 1) {
          this.appService.alert(`${data.msg}`)
          this.memo = ''
          console.log(data)
          this.followData.splice(index, 1);
          this.noReturnStatus=0;
          if (this.noReturnStatus == 0) {
            this.visitFollow();
            this.temp = 'hide' + visitId;
            this.FOLLOW_PAGE = 1;
            this.followData = [];
            this.followRefresh = true;
          } else {
            this.visitFinish();
            this.FINISH_PAGE = 1;
            this.finishData = [];
            this.finishRefresh = true;
          }
          this.storeSelected='';
          item['returnContent'].forEach(v => {
            v['checked'] ='false'
          })
        } else {
          this.appService.alert(`${data.msg}`)
        }
      }, true)
  }

  /**
   * @author() linyunfu
   * @method() contentTap 处理选中
   * @return {}void
   * **/
  contentTap(visitId, name) {
    if (this.tabs == '0') {
      this.noReturnData.filter(v => {
        return v['visitId'] == visitId
      })[0]['returnContent'].forEach(ele=> {
        if(ele['name']==name){
          if (ele['checked'] == 'false') {
            ele['checked'] = true;
          } else {
            ele['checked']= 'false';
          }
        }
      });
    } else {
      this.followData.filter(v => {
        return v['visitId'] == visitId
      })[0]['returnContent'].forEach(ele=> {
        if(ele['name']==name){
          if (ele['checked'] == 'false') {
            ele['checked'] = true;
          } else {
            ele['checked']= 'false';
          }
        }
      });
    }
  }
  /**
   *  @author() linyunfu
   *  @method()
   * */
  callPhone(memberPhone) {
    <any>window.open('tel:' + memberPhone);
  }
  /**
   *  @author() linyunfu
   *  @method() returnCustomerThree 用于页面跳转
   *  @return {} void 
   * */
  returnCustomerThree(index: any, memberId, item) {
    const Index = <any>parseInt(index);
    /**
     * 1.未回访
     * 2.跟进中
     * 3.确认
     * */
    switch (Index) {
      case 1:
        this.navCtrl.push('ReturnCustomerThreePage', { type: 1, memberId: memberId, item: item });
        break;
      case 2:
        this.navCtrl.push('ReturnCustomerThreePage', { type: 2, memberId: memberId, item: item });
        break;
      default:
        this.navCtrl.push('ReturnCustomerThreePage', { type: 3, memberId: memberId });
    }
  }
}
