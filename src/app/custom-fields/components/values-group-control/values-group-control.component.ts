import {Component, Input, forwardRef, OnDestroy, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from "@angular/forms";
import {FieldType, ICustomField} from "../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {CustomValuesService} from "../../services/custom-values.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'cf-values-group-control',
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

  @ViewChild('accordion') accordion!: MatAccordion
  @Input() field!: ICustomField;
  @Input() nesting!: number;
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter();
  public name!: string;
  public type!: FieldType;
  public minLength: any;
  public maxLength: any;
  public form!: FormGroup;
  public reorderDisabled = true;
  public expanded = false;
  private onChange!: (value: ICustomField | null | undefined) => void;
  private subscriptions: Subscription[] = [];

  constructor(
    private cvs: CustomValuesService
  ) { }

  get valueArray(): FormArray {
    return this.form.get(this.field.conditions.name) as FormArray;
  }

  toggleAccordion(event: boolean): void {
    this.expanded = event;
  }

  ngOnInit() {
    this.nesting += 1;
    this.name = this.field?.conditions?.name;
    this.type = this.field?.conditions?.type;
    this.createFormGroup();
    const formSub = this.form.valueChanges.subscribe((value: any) => {
      if (this.onChange) {
        this.onChange(value[this.name]);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  writeValue(value: any): void {
    if (!value) return;
    setTimeout(() => {
      if (Array.isArray(value)) {
        this.valueArray.clear()
        value.forEach((el: any) => {
          this.addSubfield();
        });
        this.valueArray.patchValue(value)
      } else {
        this.form.get(this.name)?.patchValue(value)
      }
    });
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

  allowReorder(): void {
    this.reorderDisabled = !this.reorderDisabled;
  }

  reorderItems(event: CdkDragDrop<string[]>) {
    const controls = this.valueArray?.controls;
    const values = this.valueArray?.value;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    moveItemInArray(values, event.previousIndex, event.currentIndex);
    this.onChange(this.form.get(this.name)?.value)
  }

  removeSubfield(i: number): void {
    this.valueArray.removeAt(i)
  }

  private createFormGroup(): void {
    this.form = this.cvs.getValuesGroupControl(this.field)
  }

}
