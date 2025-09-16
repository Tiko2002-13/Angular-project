import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [],
  templateUrl: './btn.html',
  styleUrl: './btn.scss'
})
export class Btn {
  @Input() text ?: string ;
}
