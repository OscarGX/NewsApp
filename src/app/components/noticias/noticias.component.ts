import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/interfaces/news.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() news: Article[] = [];
  @Input() favoritePage = false;

  constructor() { }

  ngOnInit() {}

}
