import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YoutubeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class YoutubeProvider {

  channelId:string ='UCq-Fj5jknLsUf-MWSy4_brA';
  maxRes:string = '10';
  googleToken:string = 'AIzaSyD25OzeOANHgXSZ_9iteN_xND-ChFdVXcM';
  search:string = 'movie';
  posts:any = [];

  constructor(public http: Http) {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId='
      + this.channelId + '&q=' + this.search + '&type=video&order=date&maxResults=' + this.maxRes
      + '&key=' + this.googleToken;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.posts = this.posts.concat(data.items);
      console.log(this.posts);
    })
  }

}
