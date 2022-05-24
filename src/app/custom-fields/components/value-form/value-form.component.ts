import {Component, forwardRef, OnDestroy, OnInit, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ICustomField, ICustomFieldConditions} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {CustomValuesService} from "../../services/custom-values.service";

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
  ]
})
export class ValueFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() field!: ICustomField;

  public form!: FormGroup;
  private onChange!: (value: any) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cvs: CustomValuesService
  ) { }

  ngOnInit(): void {
    this.createFormGroup(this.field.conditions.name);
    const formSub = this.form.valueChanges.subscribe((value: ICustomFieldConditions) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
    this.subscriptions.push(formSub);
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

  registerOnChange(fn: (v: any) => void): void {
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

  private createFormGroup(name: string) {
    // this.form = new FormGroup({})
    this.form = this.cvs.getValueFormGroup(name);
  }

}
