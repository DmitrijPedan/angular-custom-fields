import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss']
})
export class FieldTitleComponent implements OnInit {

  @Input() number: number = 0;
  @Input() name: string = 'Field';
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() addField: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
