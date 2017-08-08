import { Component } from '@angular/core';
import {Events, IonicPage, ModalController, NavController} from 'ionic-angular';
import { BibleServiceProvider } from "../../providers/bible-service/bible-service";

/**
 * Generated class for the BiblePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bible',
  templateUrl: 'bible.html',
})
export class BiblePage {

  chapters;
  chapterIndex;
  content;
  verses;
  books;
  bookIndex;
  bookName;
  textSize;
  verseSize;


  constructor(public navCtrl: NavController, public events: Events,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getBible();
    this.events.subscribe('textSize', (data) => {
      if (data != null) {
        this.textSize = 'text' + data.toString() + 'pt';
        this.verseSize = 'text' + (data - 4).toString() + 'pt';
        let fontSize = {
          textSize: data.toString() + 'pt',
          verseSize: (data - 4).toString() + 'pt'
        };
        BibleServiceProvider.setFontSize(fontSize);
      }
    })
  }

  getBible() {
    this.books = BibleServiceProvider.getListOfBooks();
    this.bookIndex = BibleServiceProvider.bookIndex;
    this.chapters = BibleServiceProvider.getListChapters();
    this.chapterIndex = BibleServiceProvider.chapterIndex + 1;
    this.verses = BibleServiceProvider.getContent();
    this.bookName = this.books[this.bookIndex].name;
    this.textSize = 'text' + BibleServiceProvider.textSize;
    this.verseSize = 'text' + BibleServiceProvider.verseSize;
  }

  update() {
    this.chapterIndex = BibleServiceProvider.chapterIndex + 1;
    this.chapters = BibleServiceProvider.getListChapters();
    this.bookIndex = BibleServiceProvider.bookIndex;
    this.verses = BibleServiceProvider.getContent();
    this.bookName = this.books[this.bookIndex].name;
  }

  changeBook(value: any) {
    BibleServiceProvider.update(value, 0);
    this.update();
  }

  changeChapter(value: any) {
    BibleServiceProvider.update(BibleServiceProvider.bookIndex, value - 1);
    this.update();
  }

  next() {
    let max = BibleServiceProvider.BIBLE[BibleServiceProvider.bookIndex].chapters.length;
    let bChange: number = BibleServiceProvider.bookIndex;
    let cChange: number = BibleServiceProvider.chapterIndex;
    if (BibleServiceProvider.chapterIndex === max - 1) {
      if (bChange < BibleServiceProvider.BIBLE.length - 1) {
        bChange++;
        cChange = 0;
      }
    } else {
      cChange++;
    }
    BibleServiceProvider.update(bChange, cChange);
    this.update();
  }

  back() {
    let bChange: number = BibleServiceProvider.bookIndex;
    let cChange: number = BibleServiceProvider.chapterIndex;
    if (bChange > 0 && (cChange === 0)) {
      bChange--;
      let max = BibleServiceProvider.BIBLE[bChange].chapters.length;
      cChange = max - 1;
    } else if (bChange >= 0 && (cChange > 0)) {
      cChange--;
    }
    BibleServiceProvider.update(bChange, cChange);
    this.update();
  }

  openFixTextSize(myEvent) {
    let modal = this.modalCtrl.create('FixTextPage', {fontSize: BibleServiceProvider.textSize});
    modal.present({
      ev: myEvent
    });
  }

  openBookList(event) {
    let info = {
      books: this.books,
      bookIndex: this.bookIndex
    }
    let modal = this.modalCtrl.create('BookListPage', info);
    modal.onDidDismiss(data => {
      if (data != null && data != this.bookIndex) {
        this.changeBook(data);
        if (this.chapters.length > 1) {
          this.openChapters(event);
        }
      }
    });
    modal.present({
      ev: event
    });
  }

  openChapters(event) {
    let modal = this.modalCtrl.create('ChapterPage', {chapters: this.chapters});
    modal.onDidDismiss(data => {
      if (data != null) {
        this.changeChapter(data);
      }
    });
    modal.present({
      ev: event
    });
  }

}
