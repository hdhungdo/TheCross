import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatTabsPage } from './chat-tabs';

@NgModule({
  declarations: [
    ChatTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatTabsPage),
  ]
})
export class ChatTabsPageModule {}
