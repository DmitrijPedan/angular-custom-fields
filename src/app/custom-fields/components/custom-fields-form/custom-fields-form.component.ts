import {Component, Input, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {CustomFieldService} from "../../services/custom-field.service";
import {MatAccordion} from "@angular/material/expansion";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-custom-fields-form',
  templateUrl: './custom-fields-form.component.html',
  styleUrls: ['./custom-fields-form.component.scss'],
})
export class CustomFieldsFormComponent   {

  @ViewChild('accordion') accordion!: MatAccordion;
  @Input() data: any;
  public form!: FormGroup;
  public jsonVisible = true;
  public reorderDisabled = true;

  constructor(
    private cf: CustomFieldService,
  ) {
    this.initForm();
  }

  get fieldsFormArray(): FormArray {
    return this.form?.get('fields') as FormArray;
  }

  toggleJson(): void {
    this.jsonVisible = !this.jsonVisible;
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
    if (this.data.fields.length) {
      this.initForm()
      this.data.fields.forEach((field: any) => {
        this.addField();
      })
    }
    setTimeout(() => {
      this.form.patchValue(this.data);
    }, 50);
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
    console.log(this.form.value)
  }

}
