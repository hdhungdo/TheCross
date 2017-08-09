import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBiblePage } from './search-bible';

@NgModule({
  declarations: [
    SearchBiblePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBiblePage),
  ],
})
export class SearchBiblePageModule {}
