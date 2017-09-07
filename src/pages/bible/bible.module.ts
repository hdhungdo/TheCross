import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiblePage } from './bible';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [
    BiblePage,
  ],
  imports: [
    IonicPageModule.forChild(BiblePage),
    DirectivesModule,
  ],
})
export class BiblePageModule {}
