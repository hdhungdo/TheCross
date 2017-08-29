import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FixTextPage} from "./fix-text";
import {ComponentsModule} from "../../../components/components.module";



@NgModule({
  declarations: [
    FixTextPage,
  ],
  imports: [
    IonicPageModule.forChild(FixTextPage),
    ComponentsModule,
  ],
})
export class FixTextPageModule {}
