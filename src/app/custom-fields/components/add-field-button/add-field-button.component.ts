import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomFieldService} from "../../services/custom-field.service";
import {FIELD_TYPES} from "../../variables/field-types";

@Component({
  selector: 'app-add-field-button',
  templateUrl: './add-field-button.component.html',
  styleUrls: ['./add-field-button.component.scss']
})
export class AddFieldButtonComponent implements OnInit {

  @Output() addField: EventEmitter<any> = new EventEmitter<any>();
  public types = FIELD_TYPES;

  constructor(
    private cf: CustomFieldService,
  ) { }

  ngOnInit(): void {

  }

  onTypeSelected(event: any): void {
    this.cf.type$.next(event.target.value);
  }

}
