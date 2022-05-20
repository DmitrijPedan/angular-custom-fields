import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FIELD_TYPES} from "../../variables/field-types";

@Component({
  selector: 'app-buttons-bar',
  templateUrl: './buttons-bar.component.html',
  styleUrls: ['./buttons-bar.component.scss']
})
export class ButtonsBarComponent implements OnInit {

  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() addRepeater: EventEmitter<void> = new EventEmitter<void>();
  @Output() addField: EventEmitter<any> = new EventEmitter<any>();
  public types = FIELD_TYPES;

  constructor() { }

  ngOnInit(): void {
  }

}
