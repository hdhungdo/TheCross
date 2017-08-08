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
    this.storage.get('bible').then((data) => {
      if (data == null) {
        this.bibleService.getBible().subscribe(rp => {
          this.storage.set('bible', rp);
        });
      }
    }).catch((data) => {
      this.bibleService.getBible().subscribe(rp => {
        this.storage.set('bible', rp);
      });
    });

    this.storage.get('bible').then((data) => {
      BibleServiceProvider.BIBLE = data;
    });
  }

  getCache() {
    let bibleInfo = {
      bookIndex: 0,
      chapterIndex: 0
    };
    this.storage.get('bibleInfo').then((data) => {
      if (data == null) {
        this.storage.set('bibleInfo', bibleInfo);
      }
    }).catch((data) => {
      this.storage.set('bibleInfo', bibleInfo);
    });

    this.storage.get('bibleInfo').then((data) => {
      BibleServiceProvider.bookIndex = data.bookIndex;
      BibleServiceProvider.chapterIndex = data.chapterIndex;
    });
  }

  getFontSize() {
    let fontSize = {
      textSize: '12pt',
      verseSize: '8pt'
    };
    this.storage.get('fontSize').then((data) => {
      if (data == null) {
        this.storage.set('fontSize', fontSize);
      }
    }).catch((data) => {
      this.storage.set('fontSize', fontSize);
    });

    this.storage.get('fontSize').then((data) => {
      BibleServiceProvider.textSize = data.textSize;
      BibleServiceProvider.verseSize = data.verseSize;
    });
  }

}
