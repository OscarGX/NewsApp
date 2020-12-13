import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@NgModule({
  declarations: [NoticiaComponent, NoticiasComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [NoticiasComponent],
  providers: [
    InAppBrowser,
    SocialSharing
  ]
})
export class ComponentsModule { }
