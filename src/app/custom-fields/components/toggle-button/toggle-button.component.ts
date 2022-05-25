import {Component} from '@angular/core';
import {ViewService} from "../../services/view.service";

@Component({
  selector: 'cf-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  constructor (public view: ViewService) {

  }

}
