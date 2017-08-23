import { NgModule } from '@angular/core';
import { HdThemeComponent } from './hd-theme/hd-theme';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [HdThemeComponent],
	imports: [IonicModule],
	exports: [HdThemeComponent]
})
export class ComponentsModule {}
