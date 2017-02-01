import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BloggerService} from "../../providers/blogger-service";
import {ItemDetailsPage} from "../item-details/item-details";
import {ReadMoreComponent} from "../pages/home/read-more";
import {CapitalizePipe} from "../../providers/capitalize.pipe";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public feeds: Array<any>;
  public firstFeed: Object;

  public labels: string = "";

  private blogId: string = "8360348492097356457";
  private url: string = "https://www.googleapis.com/blogger/v3/blogs/" + this.blogId + "/";
  private nextPageToken: string = "";

  constructor(public navCtrl: NavController, public bloggerService: BloggerService) {
    this.fetchContent();
  }

  fetchContent() {
    this.bloggerService.fetchPosts(this.url).then(data => {
      this.feeds = data.items;
      this.setFirstFeed();
      this.nextPageToken = data.nextPageToken;
    })
  }

  doInfinite(infiniteSroll) {
    if(!this.feeds) {
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

  doFilter(labels) {
    // Trigger loading
    this.feeds = null;

    // Load feed
    this.labels = labels;
    this.bloggerService.fetchSearchPosts(this.url, this.labels).then(data => {
      this.feeds = data.items;
      this.setFirstFeed();
      this.nextPageToken = data.nextPageToken;
    })
  }

  itemSelected(content: string) {
    this.navCtrl.push(ItemDetailsPage, {content: content})
  }

  setFirstFeed () {
    if (this.feeds.length > 0) {
      this.firstFeed = this.feeds[0];
      this.feeds.shift();
    }
  }

}
