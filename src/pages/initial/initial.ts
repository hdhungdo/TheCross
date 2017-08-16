import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage } from 'ionic-angular';
import { BibleServiceProvider } from "../../providers/bible-service/bible-service";

/**
 * Generated class for the InitialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  rootPage:string = 'MenuPage';

  constructor(private bibleService: BibleServiceProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.getBible();
    this.getCache();
    this.getFontSize();
  }

  getBible() {
    this.bibleService.getBible().subscribe(rp => {
      BibleServiceProvider.BIBLE = rp;
    });
  }

  getCache() {
    this.storage.get('bibleInfo').then((data) => {
      if (data !== null) {
        BibleServiceProvider.bookIndex = data.bookIndex;
        BibleServiceProvider.chapterIndex = data.chapterIndex;
      }
    });
  }

  getFontSize() {
    this.storage.get('fontSize').then((data) => {
      if (data !== null) {
        BibleServiceProvider.textSize = data.textSize;
        BibleServiceProvider.verseSize = data.verseSize;
      }
    });
  }

}
