import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {CustomFieldService} from "../../services/custom-field.service";
import {FieldType, ICustomFieldConditions} from "../../interfaces/interfaces";


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

  constructor(
    private cf: CustomFieldService
  ) {}

  get options (): FormGroup {
    return this.form.get('options') as FormGroup;
  }

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
    this.form = this.cf.getCustomFieldGroup('number');
  }

}
