import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import { StyleProvider } from "../../../providers/style/style";
import { AngularFireAuth } from "angularfire2/auth";
import {FirebaseAuthProvider} from "../../../providers/firebase-auth/firebase-auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {
    displayName: '',
    photoURL: 'http://www.freelanceme.net/Images/default%20profile%20picture.png',
    email: ''
  };
  info = {
    displayName: '',
    photoURL: ''
  };

  showEmail:boolean = true;
  editDisplayName:boolean = false;
  editPhotoUrl:boolean = false;
  updateBtn:boolean = true;

  constructor(public navCtrl: NavController, public style: StyleProvider,
              public loadingCtrl: LoadingController, public afAuth: AngularFireAuth,
              public loader: LoadingController, public fireAuth: FirebaseAuthProvider,
              public toastCtrl: ToastController, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    if (this.afAuth.auth.currentUser !== null) {
      this.user.displayName = this.afAuth.auth.currentUser.displayName;
      this.user.photoURL = this.afAuth.auth.currentUser.photoURL;
      this.user.email = this.afAuth.auth.currentUser.email;
    }
  }

  editProfile() {
    this.editDisplayName = true;
    this.editPhotoUrl = true;
    this.updateBtn = false;
    this.showEmail = false;
  }

  updateProfile() {
    if (this.info.displayName !== '' && this.info.photoURL !== '') {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.fireAuth.updateUserInfo(this.info).then((res: any) => {
        loader.dismiss();
        if (res.success) {
          this.user.displayName = this.info.displayName;
          this.user.photoURL = this.info.photoURL;
          this.user.email = this.afAuth.auth.currentUser.email;
          this.showToast('middle', 'Update Successfully!');
          this.navCtrl.pop();
        }
        else {
          this.showAlert('Failed', '');
        }
      }).catch(err => {
        this.showAlert('Failed', err.message);
      });
    } else {
      this.showAlert('Failed', 'Nick Name or PhotoURL is empty!!!');
    }
  }

  cancelClick() {
    this.editDisplayName = false;
    this.editPhotoUrl = false;
    this.updateBtn = true;
    this.showEmail = true;
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

