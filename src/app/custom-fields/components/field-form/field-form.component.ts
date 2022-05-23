import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
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
  public selectedType: IFieldType = this.fieldTypes[0];
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
      this.setType();
    });
    this.subscriptions.push(formSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get fields(): FormControl {
    return this.form.get('fields') as FormControl;
  }

  typeChanged(event: any):void {
    const value = event.target.value;
    if (this.type.value !== 'repeater') {
      this.type.setValue(value);
    } else {
      if (confirm('Are you sure you want to change the type? Nested fields will be lost!')) {
        this.type.setValue(value);
      } else {
        event.target.value = this.type.value;
      }
    }
    this.setType();
  }

  setType(): void {
    this.selectedType = this.fieldTypes.find(el => el.type === this.type.value) || this.fieldTypes[0];
    this.allowedOptions = this.selectedType.options;
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
