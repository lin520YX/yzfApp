import { NgModule } from '@angular/core';
import { ComponentsColorbarComponent } from './components-colorbar/components-colorbar';
import { ImgLazyLoadComponent } from './img-lazy-load/img-lazy-load';
import { EchartLineComponent } from './echart-line/echart-line';
import { IonicModule } from 'ionic-angular/module';
@NgModule({
	declarations: [
    ComponentsColorbarComponent,
    ImgLazyLoadComponent,
    EchartLineComponent,
   ],
	imports: [IonicModule],
	exports: [
    ComponentsColorbarComponent,
    ImgLazyLoadComponent,
    EchartLineComponent,
    ]
})
export class ComponentsModule {}
