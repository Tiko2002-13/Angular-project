import { Component,EventEmitter,Output, Input} from '@angular/core';
import { CustomInput } from '../../custom-input/custom-input';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [CustomInput,RouterLink,RouterLinkActive],
  templateUrl: './bottom-bar.html',
  styleUrls: ['./bottom-bar.scss']
})
export class BottomBar {
  logoUrl = 'assets/Logo.svg';
  @Input() currentActiveLink: string = "Home";
  @Output() pageChange = new EventEmitter();
  onPageChange(page: string) {
    this.currentActiveLink = page;
    this.pageChange.emit(page);
  }
}


