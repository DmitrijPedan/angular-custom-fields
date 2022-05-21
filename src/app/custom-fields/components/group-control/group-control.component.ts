import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import { CustomFieldService} from "../../services/custom-field.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
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

  public fieldType!: FieldType;

  _form!: FormGroup;

  private _onChange!: (
    value: ICustomField | null | undefined
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

  writeValue(value: ICustomField | null | undefined): void {
    if (!value) return;
    setTimeout(() => {
      if (value) {
        this._formConditions.setValue(value);
      }
      if (value.fields?.length) {
        this._fieldsFormArray.clear();
        value.fields.forEach((field: ICustomField) => {
          this._addGroup(field.conditions.type)
        });
      }

      this._form.patchValue(value);
    }, 50);
  }

  registerOnChange(
    fn: (value: ICustomField | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error('registerOnTouched not implemented');
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error('setDisabledState not implemented');
  }

  _addCondition() {
    this._formConditions.setValue({});
  }

  _deleteGroupFromArray(index: number) {
    this._fieldsFormArray.removeAt(index);
  }

  _addGroup(type: FieldType) {
    // this._fieldsFormArray.push(
    //   this._fb.control({
    //     conditions: {},
    //     fields: []
    //   })
    // );
    this._fieldsFormArray.push(this.cf.getCustomFieldControls(type));
  }

  get _formConditions(): FormControl {
    return this._form.get("conditions") as FormControl;
  }

  get _fieldsFormArray(): FormArray {
    return this._form.get("fields") as FormArray;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      conditions: {},
      fields: this._fb.array([])
    });

    // add one condition on the next tick, after the form creation
    setTimeout(() => this._addCondition());
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }


}
