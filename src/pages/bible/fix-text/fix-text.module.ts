import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FixTextPage} from "./fix-text";



@NgModule({
  declarations: [
    FixTextPage,
  ],
  imports: [
    IonicPageModule.forChild(FixTextPage),
  ],
})
export class FixTextPageModule {}
