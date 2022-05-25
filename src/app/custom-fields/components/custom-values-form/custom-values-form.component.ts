import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ICustomFieldsData} from "../../interfaces/interfaces";
import {CustomValuesService} from "../../services/custom-values.service";

@Component({
  selector: 'app-custom-values-form',
  templateUrl: './custom-values-form.component.html',
  styleUrls: ['./custom-values-form.component.scss']
})
export class CustomValuesFormComponent implements OnInit {

  @Input() customFields!: ICustomFieldsData;
  @Input() values!: any;
  @Output() submitHandle: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public nesting = 0;

  constructor(
    private cvs: CustomValuesService,
  ) { }

  ngOnInit(): void {
    this.buildForm(this.customFields);
    this.patchForm(this.values);

  }

  buildForm(customFields: ICustomFieldsData) {
    if (customFields?.fields?.length) {
      this.form = this.cvs.getInitialForm(customFields.fields);
    }
  }

  patchForm(values: any): void {
    if (!values) return;
    setTimeout(() => {
      Object.keys(values).forEach(key => {
        this.form.get(key)?.patchValue(values[key]);
      })
    })
  }

  submit(): void {
    const values = this.form.value;
    this.submitHandle.emit(values)
  }

}
