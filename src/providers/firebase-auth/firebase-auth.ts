import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor(public http: Http) {
    console.log('Hello FirebaseAuthProvider Provider');
  }

}
