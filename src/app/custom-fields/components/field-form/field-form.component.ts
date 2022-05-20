import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {CustomFieldService} from "../../services/custom-field.service";
import {takeUntil} from "rxjs/operators";

export interface ConditionFormComponentData {
  name: any;
  type: any;
  label: any;
}

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


  @Input()
  formLabel: string | number = "Condition";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form!: FormGroup;

  private _onChange!: (
    value: ConditionFormComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private cf: CustomFieldService
  ) {}

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: ConditionFormComponentData): void {
    if (!value) {
      return;
    }
    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ConditionFormComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error("registerOnTouched not implemented");
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error("setDisabledState not implemented");
  }

  private _createFormGroup() {
    this._form = this.cf.getCustomFieldGroup();
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }

}
