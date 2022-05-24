import {Component, Input, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
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
  ]
})
export class ValuesGroupControlComponent implements OnInit, OnDestroy, ControlValueAccessor  {

  @Input() field!: ICustomField;
  public form!: FormGroup;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cf: CustomFieldService
  ) { }

  ngOnInit(): void {
    this.createFormGroup(this.field);
    const formSub = this.form.valueChanges.subscribe((value: any) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  writeValue(value: any): void {
    if (!value) return;
  }

  registerOnChange(fn: (value: any) => void): void {
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

  get formArray(): FormArray {
    return this.form.get(this.field.conditions.name) as FormArray;
  }

  private createFormGroup(field: ICustomField) {
    this.form = this.cf.getValueGroupControlForm(field);
    console.log(`group control form (${field.conditions.name}): `, this.form)
    // if (field.conditions.type === 'repeater') {
    //   this.formArray.patchValue(field.fields)
    // }
  }

}
