import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BibleServiceProvider} from "../../../providers/bible-service/bible-service";

/**
 * Generated class for the SearchBiblePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-bible',
  templateUrl: 'search-bible.html',
})
export class SearchBiblePage {
  bible = BibleServiceProvider.BIBLE;
  list = [];
  filter = [];
  input;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    let i = 0;
    this.bible.forEach(book => {
      let j = 0;
      book.chapters.forEach(chapter => {
        for (let c in chapter) {
          let verses = chapter[c];
          for (let verse in verses) {
            let temp = {
              book: book.book,
              bookIndex: i,
              chapter: c,
              chapterIndex: j,
              verse: verse,
              content: (verses[verse]).toString()
            };
            this.list.push(temp);
          }
        }
        j++;
      });
      i++;
    });
  }

  ionViewDidLoad() {

  }

  change(bIndex, cIndex) {
    let info = {
      bookIndex: bIndex,
      chapterIndex: cIndex
    };
    this.viewCtrl.dismiss(info);
  }

  filterItems(input) {
    if (input && (input.trim() != '')) {
      this.filter = this.list.filter((item) => {
        return (item.content.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
          .replace(/ {2,}/g,' ').toUpperCase().indexOf(input.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
            .replace(/ {2,}/g,' ').toUpperCase()) > -1);
      })
    } else {
      this.filter = [];
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
