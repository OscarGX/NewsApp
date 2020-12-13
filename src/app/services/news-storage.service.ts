import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../models/interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsStorageService {
  news: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) { }
  
  saveNotice(notice: Article): void {
    const exists = this.news.find(noticeItem => noticeItem.title === notice.title);
    if (!exists) {
      this.news.unshift(notice);
      this.storage.set('favorites', this.news);
      this.presentToast('The new has been added.');
    }
  }

  async getFavorites(): Promise<void> {
    // return await this.storage.get('favorites');
    const favorites = await this.storage.get('favorites');
    if (favorites) {
      this.news = favorites;
    }
  }

  deleteFavorite(notice: Article): void {
    this.news = this.news.filter(noticeItem => noticeItem.title !== notice.title);
    this.storage.set('favorites', this.news);
    this.presentToast('The new has been deleted.');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
