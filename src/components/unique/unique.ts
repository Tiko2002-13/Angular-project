import { Component } from '@angular/core';

import { RouterLink,RouterLinkActive } from '@angular/router';
import { Btn } from '../../shared-components/btn/btn';

@Component({
  selector: 'app-unique',
  imports: [Btn, RouterLink, RouterLinkActive],
  templateUrl: './unique.html',
  styleUrl: './unique.scss'
})
export class Unique {
  protected sofaImgUrl = 'assets/sofa.svg';
  protected decorImgUrl = 'assets/Decor.svg';
}
