import {Component, forwardRef, OnDestroy, OnInit, Input} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";
import {FieldOption, ICustomField, ICustomFieldConditions, IFieldType} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {CustomFieldService} from "../../services/custom-field.service";

@Component({
  selector: 'app-value-form',
  templateUrl: './value-form.component.html',
  styleUrls: ['./value-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValueFormComponent),
      multi: true,
    },
  ]
})
export class ValueFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  public form!: FormGroup;
  private onChange!: (value: ICustomFieldConditions | null | undefined) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cfs: CustomFieldService
  ) { }

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

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get fields(): FormControl {
    return this.form.get('fields') as FormControl;
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

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.status === 'VALID' ? null : { required: true }
  }

  private createFormGroup() {
    this.form = this.cfs.getCustomFieldGroup();
  }


}
