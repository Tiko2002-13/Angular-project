import { Component,Input} from '@angular/core';
import { Stars } from "../stars/stars";

interface Product {
    name: string;
    imgUrl: string;
    price: string;
    starCount: number;
    brand: string;
}

@Component({
  selector: 'app-card',
  imports: [Stars],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card  {
  @Input() ind !: number;
  @Input() products !: Product[];
  @Input() isGrid : boolean = false;
  shopImgUrl = 'assets/shopIcon.svg';
  heartImgUrl = "assets/heartIcon.svg";
  zoomImgUrl = "assets/zoomIcon.svg";
}
