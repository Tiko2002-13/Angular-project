import { Component } from '@angular/core';
import { Btn } from '../../shared-components/btn/btn';


@Component({
  selector: 'app-news-section',
  imports: [Btn],
  templateUrl: './news-section.html',
  styleUrl: './news-section.scss'
})
export class NewsSection {
  constructor() {}
  
  protected scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
