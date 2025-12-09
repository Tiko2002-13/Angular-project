import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingMap: Map<string, boolean> = new Map<string, boolean>();

  show(key?: string): void {
    if (key) {
      this.loadingMap.set(key, true);
    }
    this.loadingSubject.next(true);
  }

  hide(key?: string): void {
    if (key) {
      this.loadingMap.delete(key);
    }
    
    if (this.loadingMap.size === 0) {
      this.loadingSubject.next(false);
    }
  }

  isLoading(key: string): boolean {
    return this.loadingMap.has(key);
  }

  get isLoadingNow(): boolean {
    return this.loadingSubject.value;
  }
}

