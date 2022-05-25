import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  public jsonVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private lsKey = 'cf-json';

  constructor(
  ) {
    const savedView = localStorage.getItem(this.lsKey);
    if (savedView) {
      this.jsonVisible$.next(JSON.parse(savedView));
    }
  }

  toggleJson(): void {
    this.jsonVisible$.next(!this.jsonVisible$.value);
    localStorage.setItem(this.lsKey, JSON.stringify(this.jsonVisible$.value));
  }

}
