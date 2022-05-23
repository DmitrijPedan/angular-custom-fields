import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {ICustomField} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {CustomFieldService} from "../../services/custom-field.service";

@Component({
  selector: 'app-values-group-control',
  templateUrl: './values-group-control.component.html',
  styleUrls: ['./values-group-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValuesGroupControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValuesGroupControlComponent),
      multi: true,
    },
  ]
})
export class ValuesGroupControlComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator  {

  public form!: FormGroup;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cf: CustomFieldService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: ICustomField) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  writeValue(obj: any) {
    console.log(obj)
  }

  registerOnChange(fn: (value: ICustomField | null | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
    // return this.form.status === 'VALID' ? null : { required: true }
  }

  private createFormGroup() {
    this.form = this.cf.getEmptyCustomFieldGroup()
    // add one condition on the next tick, after the form creation
    setTimeout(() => this.form.setValue({}));
  }

}
