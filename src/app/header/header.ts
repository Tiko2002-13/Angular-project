import { Component, Output, EventEmitter, Input} from '@angular/core';
import { BottomBar } from './bottom-bar/bottom-bar';
import { TopBar } from './top-bar/top-bar';
//import headphones from '@/assets/headphones.png';

@Component({
  selector: 'app-header',
  imports: [BottomBar,TopBar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() currentPage !: string;
  @Output() change = new EventEmitter();
  onChange(event: string) {
    this.change.emit(event);
  }
}
