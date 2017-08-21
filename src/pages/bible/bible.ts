import { Component, ViewChild } from '@angular/core';
import {ActionSheetController, Content, Events, IonicPage, ModalController, Platform} from 'ionic-angular';
import { BibleServiceProvider } from "../../providers/bible-service/bible-service";
import {StyleProvider} from "../../providers/style/style";

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
  @ViewChild(Content) ionContent: Content;

  chapters: any;
  chapterIndex: number;
  content: string;
  verses: any;
  books: any;
  bookIndex: number;
  bookName: string;
  textSize: string;
  verseSize: string;


  constructor(public events: Events, public modalCtrl: ModalController,
              public style: StyleProvider, public actionsheetCtrl: ActionSheetController,
              public platform: Platform) {
  }

  ionViewDidLoad() {
    this.getBible();
    this.events.subscribe('textSize', (data) => {
      if (data !== null) {
        this.textSize = 'text' + data.toString() + 'pt';
        this.verseSize = 'text' + (data - 4).toString() + 'pt';
        let fontSize = {
          textSize: data,
          verseSize: (data - 4)
        };
        BibleServiceProvider.setFontSize(fontSize);
      }
    });
    this.events.subscribe('searchBible', (data) => {
      if (data !== null) {
        BibleServiceProvider.update(data.bookIndex, data.chapterIndex);
        this.update();
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
    this.textSize = 'text' + BibleServiceProvider.textSize + 'pt';
    this.verseSize = 'text' + BibleServiceProvider.verseSize + 'pt';
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
    };
    let modal = this.modalCtrl.create('BookListPage', info);
    modal.onDidDismiss(data => {
      if (data != null && data !== undefined && data != this.bookIndex) {
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
      if (data !== null && data !== undefined) {
        this.changeChapter(data);
        this.ionContent.scrollToTop(500);
      }
    });
    modal.present({
      ev: event
    });
  }

  openSearchBible(event) {
    let modal = this.modalCtrl.create('SearchBiblePage');
    modal.onDidDismiss(data => {
      if (data !== null && data !== undefined) {
        this.scrollTo(data.verse);
      }
    });
    modal.present({
      ev: event
    });
  }

  scrollTo(element:string) {
    this.ionContent.resize();
    let yOffset = document.getElementById(element).offsetTop;
    this.ionContent.scrollTo(0, yOffset, 500);
  }

  higlight(verse) {
    if (verse.background === '') {
      verse.background = 'highlight';
      this.displayActionSheet(verse);
    } else {
      verse.background = '';
    }
  }

  displayActionSheet(verse) {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Copy',
          icon: !this.platform.is('ios') ? 'copy' : null,
          handler: () => {
            verse.background = '';
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            verse.background = '';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            verse.background = '';
          }
        }
      ]
    });
    actionSheet.present();
  }
}
