import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {StyleProvider} from "../../../providers/style/style";
import {TranslateServiceProvider} from "../../../providers/translate-service/translate-service";

/**
 * Generated class for the BookListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  books;
  index;
  backgroundStyle;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public style: StyleProvider, public translate: TranslateServiceProvider) {
    this.books = this.navParams.get('books');
    this.index = this.navParams.get('bookIndex');
    this.backgroundStyle = this.style.bibleDarkThemeToggle ? 'dark':'light';
  }

  ionViewDidLoad() {

  }

  change(data) {
    this.index = data;
    this.viewCtrl.dismiss(this.index);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  filterItems(ev) {
    this.books = this.navParams.get('books');
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.books = this.books.filter((item) => {
        return (this.translate.removeDiacritics(item.name.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
          .replace(/ {2,}/g,' ').toLowerCase()).indexOf(
            this.translate.removeDiacritics(val.replace(/[&\/\\#-=,+()$~%.'":*?<>{}]/gi,' ')
            .replace(/ {2,}/g,' ').toLowerCase())) > -1);
      })
    }
  }
}
