import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from "@angular/forms";
import {CustomFieldService} from "../../services/custom-field.service";
import {Subscription} from "rxjs";
import {FieldType, ICustomField} from "../../interfaces/interfaces";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'cf-fields-group-control',
  templateUrl: './fields-group-control.component.html',
  styleUrls: ['./fields-group-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldsGroupControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FieldsGroupControlComponent),
      multi: true,
    },
  ]
})
export class FieldsGroupControlComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() formLabel: string | number = "Field";
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  public form!: FormGroup;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];
  public type!: FieldType;
  public reorderDisabled = true;
  public expanded = false;

  constructor(
    private cf: CustomFieldService
  ) {}

  toggleAccordion(value: boolean): void {
    this.expanded = value;
  }

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
      if (value) {
        this.type = value.conditions.type;
        if (value.conditions.type !== 'repeater' && this.fieldsFormArray.value.length > 0) {
          // TODO: fix type changing
          // this.clearFieldsArray();
        }
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

  toggleReorder(): void {
    this.reorderDisabled = !this.reorderDisabled;
  }

  reorderFields(event: CdkDragDrop<string[]>) {
    const controls = this.fieldsFormArray?.controls;
    const values = this.fieldsFormArray?.value;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    moveItemInArray(values, event.previousIndex, event.currentIndex);
    this.onChange(this.form.value)
  }

  deleteFieldFromArray(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  addField() {
    this.fieldsFormArray.push(this.cf.getCustomFieldControls());
  }

  clearFieldsArray(): void {
    this.fieldsFormArray.clear();
  }

  private createFormGroup() {
    this.form = this.cf.getEmptyCustomFieldGroup()
    // add one condition on the next tick, after the form creation
    setTimeout(() => this.conditions.setValue({}));
  }

}
