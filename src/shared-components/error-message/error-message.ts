import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessage {
  @Input() message: string = 'An error occurred';
  @Input() type: 'error' | 'warning' | 'info' = 'error';
  @Input() showRetry: boolean = true;
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}

