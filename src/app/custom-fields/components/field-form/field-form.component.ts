import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {CustomFieldService} from "../../services/custom-field.service";
import {FieldOption, ICustomFieldConditions, IFieldType} from "../../interfaces/interfaces";
import {FIELD_TYPES} from "../../variables/field-types";

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldFormComponent),
      multi: true
    }
  ]
})
export class FieldFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public form!: FormGroup;
  private onChange!: (value: ICustomFieldConditions | null | undefined) => void;
  private subscriptions: Subscription[] = [];
  public fieldTypes: IFieldType[] = FIELD_TYPES;
  public type: IFieldType = this.fieldTypes[0];
  public allowedOptions: FieldOption[] = [];

  constructor(
    private cf: CustomFieldService
  ) {}

  ngOnInit() {
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: ICustomFieldConditions) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
    this.subscriptions.push(formSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  test(event: any):void {
    this.type = this.fieldTypes.find(el => el.type === event.target.value) || this.fieldTypes[0];
    this.allowedOptions = this.type.options;
  }

  writeValue(value: ICustomFieldConditions): void {
    if (!value) {
      return;
    }
    this.form.patchValue(value);
  }

  registerOnChange(fn: (v: ICustomFieldConditions | null | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error("registerOnTouched not implemented");
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error("setDisabledState not implemented");
  }

  private createFormGroup() {
    this.form = this.cf.getCustomFieldGroup();
  }

  showOptionControl(controlName: FieldOption): boolean {
    return this.allowedOptions.includes(controlName);
  }

}
