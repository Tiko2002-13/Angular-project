import { Component } from '@angular/core';
import { CustomInput } from '../../shared-components/custom-input/custom-input';


@Component({
  selector: 'app-footer',
  imports: [CustomInput],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  protected logoImgUrl = 'assets/Logo.svg';
  protected facebookImgUrl = 'assets/facebook.svg';
  protected twitterImgUrl = 'assets/twitter.svg';
  protected instagramImgUrl = 'assets/instagram.svg';
}
