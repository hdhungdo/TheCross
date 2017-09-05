import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {StyleProvider} from "../../../../providers/style/style";

/**
 * Generated class for the ChatTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-chat-tabs',
  templateUrl: 'chat-tabs.html'
})
export class ChatTabsPage {

  friendsRoot = 'FriendsPage';
  chatsRoot = 'ChatsPage';
  groupsRoot = 'GroupsPage';


  constructor(public style: StyleProvider) {}

}
