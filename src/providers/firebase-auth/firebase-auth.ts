import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import 'rxjs/add/operator/map';
import { Usercreds } from "../../models/usercreds";
import {reject} from "q";

@Injectable()
export class FirebaseAuthProvider {
  fireDatabase = firebase.database().ref('/users');

  signedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth, public platform: Platform,
              public facebook: Facebook, public toastCtrl: ToastController) {

  }

  logOut() {
    this.afAuth.auth.signOut();
    this.signedIn = false;
  }

  login(credentials: Usercreds) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          resolve({success: true});
          this.signedIn = true;
      }).catch((err) => {
          reject(err);
      });
    });
  }

  loginWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.loginWithFacebookMobile();
    }
    else {
      return this.loginWithFacebookWeb();
    }
  }

  loginWithFacebookMobile() {
    return new Promise((resolve, reject) => {
      this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then((res) => {
            resolve({success: true});
            this.signedIn = true;
            let user = res;
            this.afAuth.auth.currentUser.updateProfile({
              displayName: user.displayName,
              photoURL: user.photoURL
            }).then(() => {
              resolve({success: true});
              this.fireDatabase.child(this.afAuth.auth.currentUser.uid).set({
                uid: this.afAuth.auth.currentUser.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
              }).then(() => {
                resolve({success: true});
              }).catch(err => {
                reject(err);
              });
            })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      }).catch(err => {
        reject(err);
      })
    });
  }

  loginWithFacebookWeb() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          resolve({success: true});
          this.signedIn = true;
          let user = res.user;
          this.afAuth.auth.currentUser.updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL
          }).then(() => {
              resolve({success: true});
              this.fireDatabase.child(this.afAuth.auth.currentUser.uid).set({
                uid: this.afAuth.auth.currentUser.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
              }).then(() => {
                resolve({success: true});
              }).catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
        reject(err);
      });
    });
  }

  addUser(newUser: Usercreds) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(() => {
          this.afAuth.auth.currentUser.updateProfile({
            displayName: newUser.displayName,
            photoURL: 'http://www.freelanceme.net/Images/default%20profile%20picture.png'
          }).then(() => {
              this.fireDatabase.child(this.afAuth.auth.currentUser.uid).set({
                uid: this.afAuth.auth.currentUser.uid,
                email: newUser.email,
                displayName: newUser.displayName,
                photoURL: 'http://www.freelanceme.net/Images/default%20profile%20picture.png'
              }).then(() => {
                  resolve({success: true});
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  sendPasswordResetEmail(email:string) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({success: true});
      }).catch(err => {
        reject(err);
      });
    });
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: position
    });
    toast.present(toast);
  }
}
