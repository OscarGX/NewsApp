import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Article } from '../../models/interfaces/news.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  private newsSubscription = new Subscription();
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  news: Article[] = [];

  constructor(private newService: NewsService) {}

  ngOnInit(): void {
    this.segment.value = 'business';
    this.loadNews('business');
  }

  onSegmentChange(event: CustomEvent): void {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  private loadNews(category: string, event?): void {
    this.newsSubscription.add(this.newService.getTopHeadlinesByCategory(category).subscribe(data => {
      if (data.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.news.push(... data.articles);
      if (event) {
        event.target.complete();
      }
    }));
  }

  loadNewData(event) {
    this.loadNews(this.segment.value, event);
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

}
