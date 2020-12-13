import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/interfaces/news.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NewsStorageService } from '../../services/news-storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() notice: Article;
  @Input() i: number;
  @Input() favoritePage: boolean;

  constructor(private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing,
              private newStorageService: NewsStorageService) { }

  ngOnInit() {
  }

  openNewInBrowser(): void {
    const browser = this.iab.create(this.notice.url);
  }

  async showOptions(): Promise<any>  {
    let btnFavoriteHandler;
    if (this.favoritePage) {
      btnFavoriteHandler = {
        text: 'Delete from favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite delete clicked');
          this.newStorageService.deleteFavorite(this.notice);
        }
      };
    } else {
      btnFavoriteHandler = {
        text: 'Add to favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.newStorageService.saveNotice(this.notice);
        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.notice.title, this.notice.source.name, '', this.notice.url);
        }
      },
      btnFavoriteHandler,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }}]
    });
    await actionSheet.present();
  }

}
