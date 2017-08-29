import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";


/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  isIOS: boolean = false;
  isAndroid: boolean = false;
  isWindowsPhone: boolean = false;
  isWeb: boolean = false;

  constructor(public device: Platform) {
    if (this.device.is('ios')) {
      this.isIOS = true;
    } else if (this.device.is('android')) {
      this.isAndroid = true;
    } else if (this.device.is('windows')) {
      this.isWindowsPhone = true;
    } else {
      this.isWeb = true;
    }
  }

}
