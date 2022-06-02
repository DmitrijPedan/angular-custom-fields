import {Component, forwardRef, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from "@angular/forms";
import {FieldType, ICustomField, ICustomFieldAttributes, ICustomFieldConditions} from "../../interfaces/interfaces";
import {Observable, Subscription} from "rxjs";
import {CustomValuesService} from "../../services/custom-values.service";

@Component({
  selector: 'cf-value-form',
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

  @Input() field!: ICustomField;
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter();
  public form!: FormGroup;
  private onChange!: (value: ICustomFieldConditions | null | undefined) => void;
  private subscriptions: Subscription[] = [];
  public name!: string;
  public id!: any;
  public label!: string;
  public type!: FieldType;
  public attrs!: ICustomFieldAttributes;

  constructor(
    private cvs: CustomValuesService
  ) { }

  get control(): AbstractControl {
    return this.form.get(this.name) as AbstractControl;
  }

  ngOnInit() {
    this.id = Date.now();
    this.name = this.field?.conditions?.name;
    this.label = this.field?.conditions?.label;
    this.type = this.field?.conditions?.type;
    this.attrs = this.field?.conditions?.options;
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: any) => {
      if (this.onChange) {
        this.onChange(value[this.name]);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  writeValue(data: any): void {
    if (!data) return;
    setTimeout(() => {
      this.form.get(this.name)?.patchValue(data);
    })
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
    return this.form.status === 'VALID' ? null : { required: true };
  }

  setImageSrc(src: string): void {
    this.form.get(this.name)?.patchValue(src)
  }

  selectImage(): void {
    this.onImageSelect.emit(this.setImageSrc.bind(this))
  }

  private createFormGroup() {
    this.form = this.cvs.getCustomValueInput(this.field);
  }

}
