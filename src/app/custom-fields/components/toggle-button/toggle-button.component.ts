import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ViewService} from "../../services/view.service";

@Component({
  selector: 'cf-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Input() showEdit = false;
  @Input() editTitle = 'Edit'
  @Output() editHandler: EventEmitter<void> = new EventEmitter<void>()

  constructor (public view: ViewService) {

  }

}
