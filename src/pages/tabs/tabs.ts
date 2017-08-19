import { Component } from '@angular/core';
import {IonicPage, MenuController} from "ionic-angular";
import {StyleProvider} from "../../providers/style/style";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'BiblePage';
  tab3Root = 'TasksPage';

  homeTitle = 'Home';
  bibleTitle = 'Bible';
  taskTitle = 'Tasks';
  menuTitle = 'Menu';

  constructor(public menu: MenuController,
              public style: StyleProvider) {

  }

  ionViewDidLoad() {

  }

  openHome() {
    this.homeTitle = 'Home';
    this.bibleTitle = '';
    this.taskTitle = '';
    this.menuTitle = '';
  }

  openBible() {
    this.homeTitle = '';
    this.bibleTitle = 'Bible';
    this.taskTitle = '';
    this.menuTitle = '';
  }

  openTask() {
    this.homeTitle = '';
    this.bibleTitle = '';
    this.taskTitle = 'Tasks';
    this.menuTitle = '';
  }

  openMenu() {
    this.menu.toggle('menu');
  }

}
