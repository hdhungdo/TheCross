import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import { Usercreds } from "../../models/usercreds";

@Injectable()
export class FirebaseAuthProvider {
  // fireDatabase = firebase.database().ref('/chat/chatUsers');

  signedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth) {

  }

  login(credentials: Usercreds) {
    let promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          resolve({success: true});
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  addUser(newUser: Usercreds) {
    // let promise = new Promise((resolve, reject) => {
    //   this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    //     .then(() => {
    //       this.afAuth.auth.currentUser.updateProfile({
    //         displayName: newUser.displayName,
    //         photoURL: ''
    //       })
    //         .then(() => {
    //           this.fireDatabase.child(this.afAuth.auth.currentUser.uid).set({
    //             uid: this.afAuth.auth.currentUser.uid,
    //             displayName: newUser.displayName,
    //             photoURL: 'http://www.freelanceme.net/Images/default%20profile%20picture.png'
    //           })
    //             .then(() => {
    //               resolve({success: true});
    //             })
    //             .catch(err => {
    //               reject(err);
    //             })
    //         })
    //         .catch(err => {
    //           reject(err);
    //         })
    //     })
    //     .catch(err => {
    //       reject(err);
    //     })
    // });
    // return promise;
  }
}
