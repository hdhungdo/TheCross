import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  input;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
    this.afDB.list('/items/').subscribe(data => {
      this.items = data;
    });
  }

  ionViewDidLoad() {

  }

  adddItems() {
    this.afDB.list('/items/').push({item: this.input, value: 'someValue'});
  }

  printId(index) {
    console.log(this.items[index].$key);
  }

}
