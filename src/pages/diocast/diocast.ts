import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BloggerService} from "../../providers/blogger-service";
import {ItemDetailsPage} from "../item-details/item-details";

/*
  Generated class for the Diocast page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-diocast',
  templateUrl: 'diocast.html'
})
export class DiocastPage {

  public feeds: Array<any>;

  public labels: string = "DioCast";

  private blogId: string = "8360348492097356457";
  private url: string = "https://www.googleapis.com/blogger/v3/blogs/" + this.blogId + "/";
  private nextPageToken: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public bloggerService: BloggerService) {

    this.fetchContent();
  }

  fetchContent() {
    // Trigger loading
    this.feeds = null;

    // Load feed
    this.bloggerService.fetchSearchPosts(this.url, this.labels).then(data => {
      this.feeds = data.items;
      this.nextPageToken = data.nextPageToken;
    })
  }

  doInfinite(infiniteSroll) {
    if(!this.feeds || !this.nextPageToken) {
      infiniteSroll.complete();
      return;
    }

    this.bloggerService.fetchOlderPosts(this.url, this.nextPageToken, this.labels).then(data => {
      this.feeds = this.feeds.concat(data.items);
      this.nextPageToken = data.nextPageToken;
      infiniteSroll.complete();
    })
  }

  doRefresh(refresher) {
    if(!this.feeds) {
      refresher.complete();
      return;
    }

    let newestPostTime = this.feeds[0].published;

    this.bloggerService.fetchNewerPosts(this.url, newestPostTime, this.labels).then(data => {
      this.feeds = data.items.concat(this.feeds);
      refresher.complete();
    })
  }

  itemSelected(content: string) {
    this.navCtrl.push(ItemDetailsPage, {content: content})
  }
}
