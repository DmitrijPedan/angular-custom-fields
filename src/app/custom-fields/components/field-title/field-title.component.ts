import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FieldType} from "../../interfaces/interfaces";
import {FIELD_ICONS} from "../../variables/field-icons";

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss']
})
export class FieldTitleComponent implements OnInit, OnChanges {

  @Input() number: number = 0;
  @Input() value: any;
  @Input() dragDisabled = true;
  public label: string = 'Field';
  public type!: FieldType;
  private icons = FIELD_ICONS;

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

  icon(): string {
    return this.icons[this.type];
  }


}
