import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Storage } from "@ionic/storage";

/*
  Generated class for the BibleServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BibleServiceProvider {

  srcBible: string = 'assets/viet-bible.json';

  static BIBLE;
  static bookIndex: number = 0;
  static chapterIndex: number = 0;
  static storage: Storage;
  static textSize: string = '12pt';
  static verseSize: string = '8pt';

  constructor(private http: Http, private storage: Storage) {
    this.storage.get('dummy').then(data => {});
    BibleServiceProvider.storage = storage;
  }

  getBible() {
    return this.http.get(this.srcBible)
      .map((respond: Response) => respond.json());
  }

  static getBookName() {
    return BibleServiceProvider.BIBLE[BibleServiceProvider.bookIndex].book;
  }

  static getContent() {
    return BibleServiceProvider.transformToArray(BibleServiceProvider.BIBLE[BibleServiceProvider.bookIndex]
      .chapters[BibleServiceProvider.chapterIndex][(BibleServiceProvider.chapterIndex + 1).toString()]);
  }

  static update(bIndex: number, cIndex: number) {
    let bibleInfo = {
      bookIndex: bIndex,
      chapterIndex: cIndex
    };
    BibleServiceProvider.storage.set('bibleInfo', bibleInfo);
    BibleServiceProvider.bookIndex = bIndex;
    BibleServiceProvider.chapterIndex = cIndex;
  }

  static setFontSize(data) {
    BibleServiceProvider.storage.set('fontSize', data);
    BibleServiceProvider.textSize = data.textSize;
    BibleServiceProvider.verseSize = data.verseSize;
  }

  static getListOfBooks() {
    let list = [];
    let i = 0;
    BibleServiceProvider.BIBLE.forEach(item => {
      list.push({ index: i, name: item.book });
      i++;
    });
    return list;
  }

  static getListChapters() {
    let list = [];
    let i = 0;
    BibleServiceProvider.BIBLE[BibleServiceProvider.bookIndex].chapters.forEach(item => {
      list.push(i);
      i++;
    });
    return list;
  }

  static transformToArray(value: any) {
    let items = [];
    for (let key in value) {
      items.push({key: key, value: value[key]});
    }
    return items;
  }

}
