import { Component } from '@angular/core';
import { Btn } from "../btn/btn";

@Component({
  selector: 'app-news-section',
  imports: [Btn],
  templateUrl: './news-section.html',
  styleUrl: './news-section.scss'
})
export class NewsSection {
  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
