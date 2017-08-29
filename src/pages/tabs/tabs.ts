import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, MenuController, Tabs} from "ionic-angular";
import {StyleProvider} from "../../providers/style/style";
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('MainTabs') tabRef: Tabs;

  tab1Root = 'HomePage';
  tab2Root = 'BiblePage';
  tab3Root = 'TasksPage';

  homeTitle = 'Home';
  bibleTitle = 'Bible';
  taskTitle = 'Tasks';
  menuTitle = 'Menu';

  constructor(public menu: MenuController, public fireAuth: FirebaseAuthProvider,
              public style: StyleProvider, public event: Events) {

  }

  ionViewDidLoad() {
    this.event.subscribe('signedOut',(data) => {
      if (data) {
        let currentTab = this.tabRef.getSelected();
        let taskTab = this.tabRef.getByIndex(2);
        if (currentTab === taskTab) {
          this.tabRef.select(0);
        }
      }
    });
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
