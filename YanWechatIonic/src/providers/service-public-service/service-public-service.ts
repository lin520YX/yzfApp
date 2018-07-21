// create by linyunfu 公共服务类 2018-05-01

import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ParamsPublic } from '../../publics/public';

@Injectable()
export class AppGlobal {
    // public apiUrl = 'http://hyxt.yanzhifang.com';
    // static domain = "http://hyxt.yanzhifang.com/api/";
    // 8080测试端口
    public apiUrl = 'http://hyxt.yanzhifang.com:8080';
    static domain = "http://hyxt.yanzhifang.com:8080/api/";
    // public apiUrl = 'http://192.168.1.222:8201';
    // static domain = "http://192.168.1.222:8201/api/";
    // public apiUrl = 'http://192.168.1.222:8200';
    // static domain = "http://192.168.1.222:8200/api/";
    static headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
}
@Injectable()
export class AppService {
    constructor(
        public http: Http,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private params:ParamsPublic,
     ) { }
    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    }
   
    httpPost(url, params, callback, loader: boolean = false) {
     
              
                let loading = this.loadingCtrl.create({ spinner: 'bubbles' });
                if (loader) {
                    loading.present();
                }
                let userId:any;
                let storeId:any;
                this.getItem('userInfo',val=>{
                    userId=val['id']
                })
                this.getItem('curStore',val=>{
                    storeId=val['id']
                })
               const Params={
                   userId:userId,
                   storeId:storeId
               }
               for(let attr in params){
                    
                    Params[attr]=params[attr]
               }
               console.log(Params);
                this.http.post(AppGlobal.domain + url, this.params.paramsPublic(Params), { headers: AppGlobal.headers })
                    .toPromise()
                    .then(res => {
                        var d = res.json();
                        if (loader) {
                            loading.dismiss();
                        }
                        callback(d == null ? "[]" : d);
                    }).catch(error => {
                        if (loader) {
                            loading.dismiss();
                        }
                        this.handleError(error);
                    });
    
    }

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：400)';
            console.log('请检查参数类型是否匹配');
        }else
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        else
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }else{
            msg = '您的网络有问题，请检查网络及网络授权';
            console.error(msg + '，请检查路径是否正确');
        } 
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    getResources(url, callback) {
        this.http.get(url).subscribe(res => {
            callback(res.json() == null ? "[]" : res.json());
        })
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {

                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            callback();
                        }
                    }
                ]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }

    backAlert(viewCtrl){
        let confirm = this.alertCtrl.create({
          title: '提示',
          message: '您的操作未完成，确定要退出？',
          buttons: [
            {
              text: '确定',
              handler: () => {
                try{
                    this.removeItem('cb')
                }catch(e){

                }finally{
                    viewCtrl.dismiss()
                }
               
              }
            },
            {
              text: '取消',
              handler: () => {
              }
            }
          ]
        });
        confirm.present();
    }

    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top',
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    setItem(key: string, obj: any) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }
    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            callback(1)
            // console.error("window.localStorage error:" + e);
        }
    }
    removeItem(key: string) {
        try {
           window.localStorage.removeItem(key)
        }
        catch (e) {
            // console.error("window.localStorage error:" + e);
        }
    }
}
