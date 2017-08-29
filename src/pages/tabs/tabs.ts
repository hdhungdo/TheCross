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
  tab4Root = 'ChatTabsPage';

  homeTitle = 'Home';
  bibleTitle = 'Bible';
  taskTitle = 'Tasks';
  menuTitle = 'Menu';
  chatTitle = 'Message';

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
    this.chatTitle = '';
  }

  openBible() {
    this.homeTitle = '';
    this.bibleTitle = 'Bible';
    this.taskTitle = '';
    this.menuTitle = '';
    this.chatTitle = '';
  }

  openTask() {
    this.homeTitle = '';
    this.bibleTitle = '';
    this.taskTitle = 'Tasks';
    this.menuTitle = '';
    this.chatTitle = '';
  }

  openChat() {
    this.homeTitle = '';
    this.bibleTitle = '';
    this.taskTitle = '';
    this.menuTitle = '';
    this.chatTitle = 'Message';
  }

  openMenu() {
    this.menu.toggle('menu');
  }

}
