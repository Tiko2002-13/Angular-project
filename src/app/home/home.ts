import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { Featured } from "../featured/featured";
import { Latest } from "../latest/latest";
import { Unique } from "../unique/unique";
import { Trending } from "../trending/trending";
import { Discount } from "../discount/discount";
import { TopCategories } from "../top-categories/top-categories";
import { NewsSection } from "../news-section/news-section";
import { Blog } from "../blog/blog";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  imports: [Hero, Featured, Latest, Unique, Trending, Discount, TopCategories, NewsSection, Blog, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
