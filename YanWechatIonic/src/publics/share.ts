import { LoadingController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

declare var Wechat;


@Injectable()
export class AppShare {
    constructor(public loadingCtrl: LoadingController, platform: Platform) {
      
    }

    wxShare(title:string,scene:number,description:string,image:string,link:string):void {
        console.log(link)
        var loading = this.loadingCtrl.create({ showBackdrop: false });
        loading.present();
        try {
            Wechat.share({
                message: {
                    title: title,
                    description:description,
                    thumb: image,
                    mediaTagName: "TEST-TAG-001",
                    messageExt: "",  // 这是第三方带的测试字段
                    messageAction: "", // <action>dotalist</action>
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: link
                    }
                },
                scene: scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline  // share to Timeline
            }, function () {
                // alert("分享成功！");
            }, function (reason) {
                // alert("Failed: " + reason);
            });
        } catch (error) {
            console.log(error);
        } finally {
            loading.dismiss();
        }
    }
}

