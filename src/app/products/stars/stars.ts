import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stars',
  imports: [CommonModule],
  templateUrl: './stars.html',
  styleUrl: './stars.scss'
})
export class Stars {
  starActiveImgUrl = 'assets/starActive.svg';
  starImgUrl = 'assets/star.svg';
  @Input({required: true}) starCount : number = 0;
  stars = Array(5).fill(0);
}
