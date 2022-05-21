import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import { CustomFieldService} from "../../services/custom-field.service";
import {Subject, Subscription} from "rxjs";
import {ConditionFormComponentData} from "../field-form/field-form.component";
import {takeUntil} from "rxjs/operators";
import {FieldType} from "../../interfaces/interfaces";

export interface GroupControlComponentData {
  conditions: ConditionFormComponentData;
  fields: GroupControlComponentData[];
}

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

  @Input() formLabel: string | number = "Group";
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  public fieldType!: FieldType;

  _form!: FormGroup;

  private _onChange!: (
    value: GroupControlComponentData | null | undefined
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

  writeValue(value: GroupControlComponentData | null | undefined): void {
    if (!value) return;
    this.fieldType = value.conditions?.type;
    setTimeout(() => {
      if (value.conditions) {
        this._addCondition()
      }

      if (value.fields.length) {
        this._fieldsFormArray.clear();
        value.fields.forEach(g => this._addGroup());
      }

      this._form.patchValue(value);
    }, 50);
  }

  registerOnChange(
    fn: (value: GroupControlComponentData | null | undefined) => void
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
    this._formConditions.setValue({name: '', label: '', type: ''});
  }

  _deleteGroupFromArray(index: number) {
    this._fieldsFormArray.removeAt(index);
  }

  _addGroup() {
    this._fieldsFormArray.push(
      this._fb.control({
        conditions: {},
        fields: []
      })
    );
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
