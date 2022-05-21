import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FIELD_TYPES} from "../../variables/field-types";

@Component({
  selector: 'app-add-field-button',
  templateUrl: './add-field-button.component.html',
  styleUrls: ['./add-field-button.component.scss']
})
export class AddFieldButtonComponent implements OnInit {

  @Output() addField: EventEmitter<any> = new EventEmitter<any>();
  public types = FIELD_TYPES;

  constructor() { }

  ngOnInit(): void {
  }

}
