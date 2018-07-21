import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
declare var echarts;

/**
 * Generated class for the EchartLineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'echart-line',
  templateUrl: 'echart-line.html'
})
export class EchartLineComponent {
  @ViewChild('container') container: ElementRef;
  @Input() config:any;//此为 echart 组件的配置项
  @Input() cheight:any;//设置  图表的高度
  @Output() pwdResult = new EventEmitter<any>();
  defaltOption;
  chart: any;
  constructor() {
    console.log(this.config)
    this.defaltOption = {
      baseOption: {
        toolbox: {
          show: false, // 是否显示工具栏
          feature: {
            dataView: {
              readOnly: true // 数据只读
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        }
      }
    };
  }
  ionViewDidEnter(){

  }
  ngOnChanges(changes) {
      this.refresh();
  }
  ngAfterContentInit() {
      this.refresh();
  }
  refresh(){
    let ctx = this.container.nativeElement;
    if(this.cheight){
      ctx.style.height=this.cheight+'px';
    }
    this.chart = echarts.init(ctx);
    this.chart.setOption(this.config);
  }

}
