import { Component } from '@angular/core';
import { Btn } from "../btn/btn";
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-unique',
  imports: [Btn, RouterLink, RouterLinkActive],
  templateUrl: './unique.html',
  styleUrl: './unique.scss'
})
export class Unique {
  sofaImgUrl = 'assets/sofa.svg';
  decorImgUrl = 'assets/Decor.svg';
}
