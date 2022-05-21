import { Component } from '@angular/core';
import {data} from "./custom-fields/variables/data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-fields';

  public data = data;

}
