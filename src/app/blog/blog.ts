import { Component } from '@angular/core';
import { BlogCard } from "./blog-card/blog-card";


interface BlogItem {
  contactName : string;
  date: string;
  title: string;
  descryption: string;
  imgUrl: string;
}

@Component({
  selector: 'app-blog',
  imports: [BlogCard],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog {
  blogItem1: BlogItem = {
    contactName: "Mary Smith",
    date: "13 November 2014",
    title: "Top Trends in 2014",
    descryption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.",
    imgUrl: 'assets/blogImg1.svg'
  }
  blogItem2: BlogItem = {
    contactName: "Jon Doe",
    date: "21 August 2023",
    title: "Top esssential Trends in 2021",
    descryption: "Nullam nec fringilla erat, ac dapibus nunc. Integer semper ipsum in fermentum aliquam.",
    imgUrl: 'assets/blogImg2.svg'
  }

  blogItem3: BlogItem = {
    contactName: "Any Carpenter",
    date: "06 March 2018",
    title: "Top Trends in 2018",
    descryption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.",
    imgUrl: 'assets/blogImg3.svg'
  }
}
