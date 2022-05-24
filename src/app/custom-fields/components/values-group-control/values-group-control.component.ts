import {Component, Input, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";
import {FieldType, ICustomField} from "../../interfaces/interfaces";
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

  @Input() field!: ICustomField;
  public form!: FormGroup;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];
  public type!: FieldType;

  constructor(
    private cfs: CustomFieldService
  ) { }

  get conditions(): FormControl {
    return this.form.get('conditions') as FormControl;
  }

  get fieldsFormArray(): FormArray {
    return this.form.get('fields') as FormArray;
  }


  ngOnInit() {
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

  writeValue(value: ICustomField | null | undefined): void {
    if (!value) return;
    setTimeout(() => {
      if (value) {
        this.conditions.setValue(value);
      }
      if (value.fields?.length) {
        this.fieldsFormArray.clear();
        value.fields.forEach((field: ICustomField) => {
          this.addField()
        });
      }
      this.form.patchValue(value);
    }, 10);
  }

  registerOnChange(fn: (value: ICustomField | null | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error('registerOnTouched not implemented');
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error('setDisabledState not implemented');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.status === 'VALID' ? null : { required: true }
  }

  deleteFieldFromArray(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  addField() {
    this.fieldsFormArray.push(this.cfs.getCustomFieldControls());
  }

  clearFieldsArray(): void {
    this.fieldsFormArray.clear();
  }

  private createFormGroup() {
    this.form = this.cfs.getEmptyCustomFieldGroup()
    // add one condition on the next tick, after the form creation
    setTimeout(() => this.conditions.setValue({}));
  }

}
