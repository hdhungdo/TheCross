import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usercreds } from "../../models/usercreds";

@Injectable()
export class FirebaseAuthProvider {
  fireDatabase = firebase.database().ref('/chat/chatUsers');

  signedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth) {

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
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          resolve(res);
          this.signedIn = true;
          let user = res.user;
          this.afAuth.auth.currentUser.updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL
          }).then(() => {
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
}
