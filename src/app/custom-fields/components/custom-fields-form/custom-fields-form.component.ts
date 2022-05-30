import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {CustomFieldService} from "../../services/custom-field.service";
import {ViewService} from "../../services/view.service";
import {MatAccordion} from "@angular/material/expansion";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ICustomField} from "../../interfaces/interfaces";

@Component({
  selector: 'cf-custom-fields-form',
  templateUrl: './custom-fields-form.component.html',
  styleUrls: ['./custom-fields-form.component.scss'],
})
export class CustomFieldsFormComponent implements OnInit, OnChanges {

  @ViewChild('accordion') accordion!: MatAccordion;
  @Input() customFields!: ICustomField[] | null | undefined;
  @Output() submitHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelHandler: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public reorderDisabled = true;
  public expanded = false;

  constructor(
    private cf: CustomFieldService,
    public view: ViewService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const customFields = changes.customFields?.currentValue;
    if (customFields) {
      this.buildFormFromData();
    }
  }

  toggleAccordion(value: boolean): void {
    this.expanded = value;
  }

  get fieldsFormArray(): FormArray {
    return this.form?.get('fields') as FormArray;
  }

  toggleReorder(): void {
    this.reorderDisabled = !this.reorderDisabled;
  }

  reorderFields(event: CdkDragDrop<string[]>) {
    const controls = this.fieldsFormArray?.controls;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    const upd = controls.map((el: any) => el.value);
    this.fieldsFormArray?.setValue(upd)
  }

  buildFormFromData() {
    if (this.customFields?.length) {
      this.initForm()
      this.customFields?.forEach((field: ICustomField) => {
        this.addField();
      })
      setTimeout(() => {
        if (this.customFields) {
          this.fieldsFormArray.patchValue(this.customFields)
        }
      }, 0);
    }

  }

  addField() {
    this.fieldsFormArray.push(this.cf.getCustomFieldControls());
  }

  deleteField(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  initForm() {
    this.form = this.cf.getInitialForm();
  }

  submit(): void {
    this.submitHandler.emit(this.fieldsFormArray.value)
  }

}

