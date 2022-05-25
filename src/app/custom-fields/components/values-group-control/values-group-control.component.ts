import {Component, Input, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";
import {FieldType, ICustomField} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {CustomValuesService} from "../../services/custom-values.service";

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
  @Input() nesting!: number;
  public form!: FormGroup;
  public type!: FieldType;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cvs: CustomValuesService
  ) { }

  get valueArray(): FormArray {
    return this.form.get(this.field.conditions.name) as FormArray;
  }

  ngOnInit() {
    this.nesting += 1;
    this.type = this.field?.conditions?.type;
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: any) => {
      if (this.onChange) {
        if (this.nesting > 1) {
          this.onChange(value[this.field.conditions.name]);
        } else {
          this.onChange(value);
        }
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  writeValue(value: ICustomField | null | undefined): void {
    // if (!value) return;
    // setTimeout(() => {
    //   if (value) {
    //     // this.conditions.setValue(value);
    //   }
    //   if (value.fields?.length) {
    //     this.fieldsFormArray.clear();
    //     value.fields.forEach((field: ICustomField) => {
    //       this.addField();
    //       this.addSubfield();
    //     });
    //   }
    //   this.form.patchValue(value);
    // }, 10);
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

  addSubfield(): void {
    this.valueArray.push(this.cvs.getRepeaterGroup(this.field));
  }


  private createFormGroup(): void {
    this.form = this.cvs.getValuesGroupControl(this.field)
  }

}
