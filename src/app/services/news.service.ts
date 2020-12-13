import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TopHeadlinesI } from '../models/interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private headlinesPage = 0;
  private currentCategory = '';
  private categoryPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadlines(): Observable<TopHeadlinesI> {
    this.headlinesPage++;
    return this.http.get<TopHeadlinesI>(`${environment.NEWS_API_ENDPOINT}/top-headlines?country=us&apiKey=${environment.NEWS_API_KEY}&page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(category: string): Observable<TopHeadlinesI> {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }
    return this.http.get<TopHeadlinesI>(`${environment.NEWS_API_ENDPOINT}/top-headlines?country=us&category=${category}&apiKey=${environment.NEWS_API_KEY}&page=${this.categoryPage}`);
  }
}
