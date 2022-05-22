import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FieldType} from "../../interfaces/interfaces";

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss']
})
export class FieldTitleComponent implements OnInit {

  @Input() number: number = 0;
  @Input() type: any;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() addField: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.type)
  }

}
