import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import { BottomBar } from './bottom-bar/bottom-bar';
import { TopBar } from './top-bar/top-bar';

@Component({
  selector: 'app-header',
  imports: [BottomBar,TopBar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  @Input() currentPage !: string;
  @Output() change = new EventEmitter();

  constructor() {}

  protected onChange(event: string) {
    this.change.emit(event);
  }
}
