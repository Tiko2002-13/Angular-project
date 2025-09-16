import { Component } from '@angular/core';
import { CustomInput } from "../custom-input/custom-input";

@Component({
  selector: 'app-footer',
  imports: [CustomInput],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  logoImgUrl = 'assets/Logo.svg';
  facebookImgUrl = 'assets/facebook.svg';
  twitterImgUrl = 'assets/twitter.svg';
  instagramImgUrl = 'assets/instagram.svg';
}
