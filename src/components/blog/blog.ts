import { Component } from '@angular/core';
import { BlogCard } from './blog-card/blog-card';
import BlogItem from '../../app/models/blogItem.interface';



@Component({
  selector: 'app-blog',
  imports: [BlogCard],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  protected blogItems: BlogItem[] = [
    {
      contactName: 'Mary Smith',
      date: '13 November 2014',
      title: 'Top Trends in 2014',
      descryption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.',
      imgUrl: 'assets/blogImg1.svg',
    },
    {
      contactName: 'Jon Doe',
      date: '21 August 2023',
      title: 'Top esssential Trends in 2021',
      descryption:
        'Nullam nec fringilla erat, ac dapibus nunc. Integer semper ipsum in fermentum aliquam.',
      imgUrl: 'assets/blogImg2.svg',
    },
    {
      contactName: 'Any Carpenter',
      date: '06 March 2018',
      title: 'Top Trends in 2018',
      descryption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.',
      imgUrl: 'assets/blogImg3.svg',
    },
  ];
}
