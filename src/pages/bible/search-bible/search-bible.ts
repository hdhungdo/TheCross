import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, ToastController, ViewController} from 'ionic-angular';
import {BibleServiceProvider} from "../../../providers/bible-service/bible-service";
import {TranslateServiceProvider} from "../../../providers/translate-service/translate-service";

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

  constructor(public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public translate: TranslateServiceProvider,
              public loading: LoadingController,
              public event: Events) {
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

  change(bIndex, cIndex, verse) {
    let info = {
      bookIndex: bIndex,
      chapterIndex: cIndex,
      verse: verse.toString()
    };
    this.event.publish('searchBible', info);
    this.viewCtrl.dismiss(info);
  }

  filterItems(input) {
    let load = this.loading.create({
      content: 'Searching...Please wait!'
    });
    if (input && (input.trim() != '')) {
      load.present(load).then(() => {
        this.filter = this.list.filter((item) => {

          return (this.translate.removeDiacritics(item.content.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
            .replace(/ {2,}/g,' ').toUpperCase()).indexOf(
            this.translate.removeDiacritics(input.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
              .replace(/ {2,}/g,' ').toUpperCase())) > -1);
        });
        load.dismiss(load);
        if (this.filter.length == 0) {
          let message = 'Cannot find "' + input + '"';
          this.showToast('top', message)
        }
      });
    } else {
      this.showToast('top', 'Please input text you want to search')
      this.filter = [];
    }

  }

  close() {
    this.viewCtrl.dismiss();
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
