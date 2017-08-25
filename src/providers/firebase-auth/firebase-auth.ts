import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import {Usercreds} from "../../models/usercreds";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  signedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth) {

  }

  login(credentials: Usercreds) {
    let promise = new Promise((resole, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          resole(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

}
