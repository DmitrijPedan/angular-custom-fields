import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomFieldService} from "../../services/custom-field.service";
import {Subscription} from "rxjs";
import {FieldType, ICustomField} from "../../interfaces/interfaces";


@Component({
  selector: 'app-group-control',
  templateUrl: './group-control.component.html',
  styleUrls: ['./group-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GroupControlComponent),
    multi: true
  }]
})
export class GroupControlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() formLabel: string | number = "Field";
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  public form!: FormGroup;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];
  public type!: FieldType;

  constructor(
    private cf: CustomFieldService
  ) {}

  get conditions(): FormControl {
    return this.form.get('conditions') as FormControl;
  }

  get fieldsFormArray(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  ngOnInit() {
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: ICustomField) => {
      this.type = value.conditions.type;
      if (this.onChange) {
        this.onChange(value);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy() {
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

  deleteFieldFromArray(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  addField() {
    this.fieldsFormArray.push(this.cf.getCustomFieldControls());
  }

  private createFormGroup() {
    this.form = this.cf.getEmptyCustomFieldGroup()
    // add one condition on the next tick, after the form creation
    setTimeout(() => this.conditions.setValue({}));
  }

}
