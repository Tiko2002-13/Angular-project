import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingMap: Map<string, boolean> = new Map<string, boolean>();

  /**
   * Show loading indicator
   * @param key Optional key to track specific loading states
   */
  show(key?: string): void {
    if (key) {
      this.loadingMap.set(key, true);
    }
    this.loadingSubject.next(true);
  }

  /**
   * Hide loading indicator
   * @param key Optional key to track specific loading states
   */
  hide(key?: string): void {
    if (key) {
      this.loadingMap.delete(key);
    }
    
    // Only hide if no other loading operations are in progress
    if (this.loadingMap.size === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Check if a specific operation is loading
   * @param key The key to check
   */
  isLoading(key: string): boolean {
    return this.loadingMap.has(key);
  }

  /**
   * Get current loading state
   */
  get isLoadingNow(): boolean {
    return this.loadingSubject.value;
  }
}

