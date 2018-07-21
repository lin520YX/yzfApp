import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
declare var echarts;
/**
 * Generated class for the SalesStatementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-statement-detail',
  templateUrl: 'sales-statement-detail.html',
})
export class SalesStatementDetailPage {
  private config: any
  private date = [];
  private numdata = [];
  public counts: any;
  public hcount: any;
  public hcolor: any;
  public tcount: any;
  public tcolor: any;
  public listMap: Array<any>;
  public i = 2;
  // 储存
  public si: number = 2;
  public typeName: string;
  public typeUnit: string = '元';
  public saleMark: string = '以上指标只显示当前月份1号到现在的累计值';
  public Name: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
    this.Name = this.navParams.get('typeName') == '销售业绩' ? '' : this.navParams.get('typeName');
    console.log(this.navParams.get('typeName'))
    this.config = {
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      legend: {
        data: [],
        right: 1,
        top: 1
      },
      grid: {
        left: 50,
        top: 45,
        right: 30,
        bottom: 20,
      },
      toolbox: {
        show: false,
      },
      xAxis: {
        nameGap: 3,
        nameTextStyle: {
          color: '#999999',
        },
        type: 'category',
        boundaryGap: false,
        data: this.date,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee',
            fontSize: 14
          }
        },
        axisLabel: {
          margin: 8,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        }
      },
      yAxis: {
        name: '                                        我的趋势',
        nameGap: 4,
        nameTextStyle: {
          color: '#777777',
          fontSize: '18',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            color: ['#eeeeee']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee',
            fontSize: 20
          }
        },
        axisLabel: {
          margin: 8,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        }
      },
      series: [{
        data: this.numdata,
        type: 'line',
        areaStyle: {
          normal: {
            fontSize: 14,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: 'rgba(255,240,245,1)'
            },
            {
              offset: 0.5,
              color: 'rgba(233,193,194,1)'
            },
            {
              offset: 1,
              color: 'rgba(233,193,194,1)'
            }], false)
          }
        },
        itemStyle: {
          show: true,
          normal: {
            color: 'rgba(233,193,194,1)'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'outside',
            textStyle: {
              color: '#999999',
              fontSize: 12,
            }
          }
        },
        lineStyle: {
          normal: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
              offset: 0,
              color: 'rgba(228,142,127,1)'
            }, {
              offset: 1,
              color: 'rgba(228,142,127,1)'
            }], false)
          }
        },
      }]
    };
    console.log(this.config)
    console.log(this.navParams.get('typeName'))
    switch (this.navParams.get('type')) {
      case 1:
        this.typeName = '新会员数';
        this.typeUnit = '人';
        break;
      case 2:
        this.typeName = '新客数';
        this.typeUnit = '人';
        break;
      case 3:
        this.typeName = '消费人数';
        this.typeUnit = '人';
        break;
      case 4:
        this.typeName = '总销售额';
        this.typeUnit = '万元';
        break;
      case 5:
        this.typeName = '会员消费额';
        this.typeUnit = '万元';
        break;
      case 6:
        this.typeName = '非会员消费额'
        this.typeUnit = '万元';
        break;
      case 7:
        this.typeName = '客单价'
        this.typeUnit = '元';
        break;
      case 8:
        this.typeName = '客单数';
        this.typeUnit = '单';
        break;
      case 9:
        this.typeName = '微会员数';
        this.typeUnit = '人';
        break;
      default:

    }
  }

  ionViewDidLoad() {
    this.ssdhttp(2);
    console.log('ionViewDidLoad SalesStatementDetailPage');
  }
  TimeInterval(i) {
    switch (i) {
      case 1:
        this.saleMark = '以上指标只显示本周三到当日统计值';
        break;
      case 2:
        this.saleMark = '以上指标只显示当前月份1号到现在的累计值';
        break;
      default:
        this.saleMark = '以上指标只显示当前自然季度第一日至当日的月度统计值';

    }
    if (this.si == i) {
      return;
    }
    this.ssdhttp(i);
    this.i = i;
    this.date = [];
    this.numdata = [];
    this.si = i;
  }
  ssdhttp(states) {
    this.appService.httpPost('getSalePerfromancestorAnalysis.api',
      {
        type: this.navParams.get('type'),
        storeId: this.navParams.get('storeId') || '',
        states: states
      }, data => {
        console.log(data)
        this.counts = data.data['counts'] || 0;
        this.hcount = data.data['hcount'] || 0;
        this.hcolor = (this.hcount + '').replace(/\%/gi, '');
        this.tcount = data.data['tcount'] || 0;
        this.tcolor = (this.tcount + '').replace(/\%/gi, '');
        this.listMap = data.data['listMap'] || [];
        for (let i = 0, pLength = data.data['porData']; i < pLength.length; i++) {
          for (let attr in pLength[i]) {
            if (attr == 'createTime') {
              this.date.push(pLength[i]['createTime'].substr(5))
            }
            if (attr == 'num') {
              if (this.navParams.get('type') == 4) {
                this.numdata.push((pLength[i]['num'] / 10000).toFixed(2));
              } else if (this.navParams.get('type') == 5) {
                this.numdata.push((pLength[i]['num'] / 10000).toFixed(2));
              } else if (this.navParams.get('type') == 6) {
                this.numdata.push((pLength[i]['num'] / 10000).toFixed(2));
              } else {
                this.numdata.push(pLength[i]['num']);
              }

            }
          }


        }
        console.log(this.numdata)
        this.config = {
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          legend: {
            data: [],
            right: 1,
            top: 1
          },
          grid: {
            left: 50,
            top: 45,
            right: 30,
            bottom: 20,
          },
          toolbox: {
            show: false,
          },
          xAxis: {
            nameGap: 3,
            nameTextStyle: {
              color: '#999999',
            },
            type: 'category',
            boundaryGap: false,
            data: this.date,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                fontSize: 14
              }
            },
            axisLabel: {
              margin: 8,
              textStyle: {
                color: '#999999',
                fontSize: 12
              }
            }
          },
          yAxis: {
            name: '',
            nameGap: 4,
            nameTextStyle: {
              color: '#777777',
              fontSize: '18',
            },
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#eeeeee']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                fontSize: 20
              }
            },
            axisLabel: {
              margin: 8,
              textStyle: {
                color: '#999999',
                fontSize: 12
              }
            }
          },
          series: [{
            data: this.numdata,
            type: 'line',
            areaStyle: {
              normal: {
                fontSize: 14,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(255,240,245,1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(233,193,194,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(233,193,194,1)'
                }], false)
              }
            },
            itemStyle: {
              show: true,
              normal: {
                color: 'rgba(233,193,194,1)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
                textStyle: {
                  color: '#999999',
                  fontSize: 12,
                }
              }

            },
            lineStyle: {
              normal: {
                width: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
                  offset: 0,
                  color: 'rgba(228,142,127,1)'
                }, {
                  offset: 1,
                  color: 'rgba(228,142,127,1)'
                }], false)
              }
            },
          }]
        };
      }, true)
  }
}
