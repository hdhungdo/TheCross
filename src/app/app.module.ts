import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { BibleServiceProvider } from '../providers/bible-service/bible-service';
import { TranslateServiceProvider } from '../providers/translate-service/translate-service';
// import { AngularFireDatabaseProvider} from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { FirebaseDatabaseProvider } from '../providers/firebase-database/firebase-database';
import {FirebaseAuthProvider} from "../providers/firebase-auth/firebase-auth";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BibleServiceProvider,
    TranslateServiceProvider,
    FirebaseDatabaseProvider,
    FirebaseAuthProvider,
    // AngularFireDatabaseProvider

  ]
})
export class AppModule {}
