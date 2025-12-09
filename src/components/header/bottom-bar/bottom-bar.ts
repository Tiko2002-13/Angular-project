import { Component,EventEmitter,Output, Input} from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { CustomInput } from '../../../shared-components/custom-input/custom-input';


@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [CustomInput,RouterLink,RouterLinkActive],
  templateUrl: './bottom-bar.html',
  styleUrls: ['./bottom-bar.scss']
})
export class BottomBar {
  @Input() currentActiveLink: string = "Home";
  @Output() pageChange = new EventEmitter();

  protected logoUrl = 'assets/Logo.svg';

  constructor() {}
  
  protected onPageChange(page: string) {
    this.currentActiveLink = page;
    this.pageChange.emit(page);
  }
}


