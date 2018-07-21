import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {
    @ViewChild('img')img:ElementRef;
  default: string = 'assets/imgs/default.png';
  constructor(
  ) {

  }

@Input() src: string;

  ngOnInit() {
    
   this.lazyImg(this.src).then(()=>{
     
   })
  }
  lazyImg(src):any{
    return new Promise((resolve,reject)=>{
        let image=this.img.nativeElement
        image.onload=()=>{
            this.src = src;
        }
        image.onerror = function(){
            reject(new Error('Could not load image '));
        };
        return Promise
    })
    
  }
 

}
