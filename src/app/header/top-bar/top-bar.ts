import { Component,inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../product-card/product.service';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar implements OnInit {
  mailBoxUrl = 'assets/contact-icon1.png';
  phoneUrl = 'assets/contact-icon2.png';
  arrowDownUrl = 'assets/down_arrow.svg';
  heartUrl = 'assets/heart.svg';
  humanUrl = 'assets/human.svg';
  boughtItemUrl = 'assets/boughtItems.svg';
  currentLanguage: string = "English";
  currentMoneyType: string = "USD";
  showLanguageBar: boolean = false;
  showMoneyBar: boolean = false;
  private productService = inject(ProductService)
  itemCount : number = this.productService.getboughtProducts.length;

  onShowLanguage() {
    this.showLanguageBar = !this.showLanguageBar;
  }
 
  onShowMoneyType() {
    this.showMoneyBar = !this.showMoneyBar;
  }
   
  onChooseLanguage(language: string) {
    this.showLanguageBar = !this.showLanguageBar;
    this.currentLanguage = language;
  }

  onChooseMoney(moneyType: string) {
    this.showMoneyBar = !this.showMoneyBar;
    this.currentMoneyType = moneyType;
  }

   ngOnInit() {
    // subscribe to the boughtProducts$ observable
    this.productService.boughtProducts$.subscribe(products => {
      this.itemCount = products.length; // updates automatically
    }); 
  } 
}
