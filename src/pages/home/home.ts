import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Featured } from '../../components/featured/featured';
import { Latest } from '../../components/latest/latest';
import { Unique } from '../../components/unique/unique';
import { Trending } from '../../components/trending/trending';
import { Discount } from '../../components/discount/discount';
import { TopCategories } from '../../components/top-categories/top-categories';
import { NewsSection } from '../../components/news-section/news-section';
import { Blog } from '../../components/blog/blog';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { fadeInAnimation } from '../../app/animations/page-animations';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Featured, Latest, Unique, Trending, Discount, TopCategories, NewsSection, Blog, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: [fadeInAnimation]
})
export class Home {

}
