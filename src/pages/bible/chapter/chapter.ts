import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {BibleServiceProvider} from "../../../providers/bible-service/bible-service";

/**
 * Generated class for the ChapterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  chapters;

  grid = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chapters = this.navParams.get('chapters')
    this.setupBlock();
  }

  change(data) {
    this.viewCtrl.dismiss(data);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  setupBlock() {
    let c = [];
    for (let i = 0; i < this.chapters.length; i++) {
      let item = this.chapters[i];
      let background= '';
      if (BibleServiceProvider.chapterIndex === item) {
        background = 'div-background';
      }
      c.push({chap: item + 1, background: background});
      if (i % 4 === 3) {
        this.grid.push(c);
        c = [];
      }
    }
    this.grid.push(c);
  }
}
