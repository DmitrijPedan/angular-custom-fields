import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FieldType} from "../../interfaces/interfaces";

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss']
})
export class FieldTitleComponent implements OnInit, OnChanges {

  @Input() number: number = 0;
  @Input() value: any;
  public label: string = 'Field';
  public type!: FieldType;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes?.value?.currentValue;
    if (value && value.conditions) {
      this.label = value.conditions.label;
      this.type = value.conditions.type;
    }
  }

}