import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BloggerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BloggerService {

  private data: any;

  private defaultParams = new URLSearchParams();

  constructor(public http: Http) {
      this.defaultParams.set('fetchImages', 'true');
      this.defaultParams.set('key', 'AIzaSyDhwbXVB0qbD8FkkD3_wEEsuGTPXGYzw9E');
  }

  fetchPosts(url: string, postParams: URLSearchParams = new URLSearchParams(), additionalUrl: string = ""): Promise<any> {
    return new Promise(resolve => {

        let params = new URLSearchParams();
        params.appendAll(this.defaultParams);
        params.appendAll(postParams);

      this.http.get(url + "posts" + additionalUrl, {search: params}).map(res => res.json())
          .subscribe(data => {
            this.data = data;
            if (this.data.items) {
                this.data.items.forEach((e, i, a) => {
                    if (e.images.length > 0) {
                        e.imageUrl = e.images[0].url;
                    } else {
                        e.imageUrl = 'http://www.redditstatic.com/icon.png';
                    }
                    e.content = this.removeScriptTags(e.content);
                });
            } else {
                this.data.items = [];
            }
            resolve(this.data);
          }, err => console.log(err))
    })
  }

  fetchOlderPosts(url:string, nextPageToken: string, labels: string): Promise<any> {
      return new Promise(resolve => {
          let params = new URLSearchParams();
          if(nextPageToken && nextPageToken.length > 0) {
              params.set('pageToken', nextPageToken);
          }
          if(labels.length > 0) {
            params.set('labels', labels);
          }
          resolve(this.fetchPosts(url, params));
      });
  }

  fetchNewerPosts(url:string, newestPostTime: string, labels: string): Promise<any> {
      return new Promise(resolve => {
          let params = new URLSearchParams();

          if(labels.length > 0) {
            params.set('labels', labels);
          }

          let date = new Date(newestPostTime);
          date.setSeconds(date.getSeconds() + 1);

          params.set('startDate', date.toISOString());
          resolve(this.fetchPosts(url, params));
      });
  }

  fetchSearchPosts(url: string, searchText: string): Promise<any> {
    return new Promise(resolve => {
      let params = new URLSearchParams();
      params.set('labels', searchText);
      resolve(this.fetchPosts(url, params));
    })
  }

  private removeScriptTags (rawContent): string {
    let googleAdsSelector = /<script>\n\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);\n<\/script>/gi;
    rawContent = rawContent.replace(googleAdsSelector, '');

    let insSelector = /<ins.*>.*(<\/?ins>?)?/gi;
    rawContent = rawContent.replace(insSelector, '');

    // let aSelector = /<a.*>.*(<\/?a>?)?/gi;
    // rawContent = rawContent.replace(aSelector, '');

    let replacer = /<script.*>.*(<\/?script>?)?/gi;
    let stripped = rawContent.replace(replacer, '');

    return stripped;
  }

}
