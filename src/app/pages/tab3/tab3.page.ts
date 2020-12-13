import { Component } from '@angular/core';
import { NewsStorageService } from '../../services/news-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public newsStorageService: NewsStorageService) {
    this.newsStorageService.getFavorites();
  }

}
