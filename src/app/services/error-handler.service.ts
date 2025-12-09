import { Injectable, ErrorHandler, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('An error occurred:', error.message);
    console.error('Stack trace:', error.stack);
    
    
    this.showErrorNotification(error);
  }

  private showErrorNotification(error: Error): void {
    const userMessage = this.getUserFriendlyMessage(error);
    console.warn('User notification:', userMessage);
  }

  private getUserFriendlyMessage(error: Error): string {
    if (error.message.includes('network')) {
      return 'Network error. Please check your internet connection.';
    }
    
    if (error.message.includes('timeout')) {
      return 'Request timeout. Please try again.';
    }
    
    return 'An unexpected error occurred. Please try again later.';
  }
}

