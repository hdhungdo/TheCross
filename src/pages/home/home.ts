import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {StyleProvider} from "../../providers/style/style";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  input;

  constructor(public navCtrl: NavController, public afDB: FirebaseDatabaseProvider,
              public style: StyleProvider) {
    // this.afDB.getItems().subscribe(data => {
    //   this.items = data;
    // });
  }

  ionViewDidLoad() {

  }

  // addItems(input) {
  //   if (input !== undefined && input !== '') {
  //     this.afDB.getItems().push({item: input, value: 'someValue'});
  //   }
  // }
  //
  // printId(key) {
  //   console.log(key);
  //   this.afDB.updateItem(key);
  //   this.afDB.getItems().remove(key);
  // }

}
