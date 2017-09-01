import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import { FirebaseAuthProvider } from "../../../providers/firebase-auth/firebase-auth";
import { StyleProvider } from "../../../providers/style/style";
import { Usercreds } from "../../../models/usercreds";
import { DeviceProvider } from "../../../providers/device/device";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as Usercreds;

  constructor(public navCtrl: NavController, public device: DeviceProvider,
              public fireAuth: FirebaseAuthProvider, public style: StyleProvider,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

  }

  signIn() {
    this.fireAuth.login(this.credentials).then((respond: any) => {
      if (respond.success) {
        this.showToast('middle', 'Login Successfully!');
        this.navCtrl.pop();
      } else {
        alert(respond);
      }
    }).catch(err => {
      this.showAlert('Failed', err.message.replace('signInWithEmailAndPassword failed: ', ''));
    });
  }

  signInWithFacebook() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.fireAuth.loginWithFacebook().then((res:any) => {
      loader.dismiss();
      this.showToast('middle', 'Login Successfully!');
      this.navCtrl.pop();
    }).catch(err => {
      loader.dismiss();
      this.showAlert('Failed', err.message);
    });
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass: 'toastStyle'
    });
    toast.present(toast);
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
