import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stars',
  imports: [CommonModule],
  templateUrl: './stars.html',
  styleUrl: './stars.scss',
})
export class Stars {
  @Input({ required: true }) starCount: number = 0;
  protected starActiveImgUrl = 'assets/starActive.svg';
  protected starImgUrl = 'assets/star.svg';
  protected stars = Array(5).fill(0);
}
