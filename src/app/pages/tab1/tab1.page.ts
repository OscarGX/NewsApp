import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Article } from '../../models/interfaces/news.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  private subscription = new Subscription();
  news: Article[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(event?) {
    this.subscription.add(
      this.newsService.getTopHeadlines().subscribe(data => {
        if (data.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.news.push(...data.articles);
        if (event) {
          event.target.complete();
        }
      })
    );
  }

  loadNewData(event) {
    this.loadNews(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
