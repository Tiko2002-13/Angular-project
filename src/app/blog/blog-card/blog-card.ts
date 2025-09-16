import { Component, Input } from '@angular/core';

interface BlogItem {
  contactName : string;
  date: string;
  title: string;
  descryption: string;
  imgUrl: string;
}

@Component({
  selector: 'app-blog-card',
  imports: [],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss'
})
export class BlogCard {
  @Input() blogCard !: BlogItem;
  blogImgUrl = 'assets/blogImg1.svg';
  penImgUrl = 'assets/penIcon.svg';
  calendarImgUrl = 'assets/calendarIcon.svg';
}
