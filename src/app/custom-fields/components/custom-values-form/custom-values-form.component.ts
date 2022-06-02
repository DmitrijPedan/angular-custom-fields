import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ICustomField} from "../../interfaces/interfaces";
import {CustomValuesService} from "../../services/custom-values.service";
import {ViewService} from "../../services/view.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'cf-custom-values-form',
  templateUrl: './custom-values-form.component.html',
  styleUrls: ['./custom-values-form.component.scss']
})
export class CustomValuesFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() customFields!: ICustomField[];
  @Input() values!: any;
  @Output() submitHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public nesting = 0;
  public invalid = true;
  private subs: Subscription[] = [];

  constructor(
    private cvs: CustomValuesService,
    public view: ViewService,
  ) { }

  ngOnInit(): void {
    const valid = this.cvs.validateFieldsArray(this.customFields);
    if (valid) {
      this.buildForm(this.customFields);
      this.patchForm(this.values);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    const values = changes?.values?.currentValue;
    const valid = this.cvs.validateFieldsArray(this.customFields);
    if (values && valid) {
      this.patchForm(values)
    }
  }

  buildForm(customFields: ICustomField[]) {
    if (customFields?.length) {
      this.form = this.cvs.getInitialForm(customFields);
      const valuesSub = this.form.valueChanges.subscribe(value => this.invalid = this.form.invalid);
      this.subs.push(valuesSub);
    }
  }

  patchForm(values: any): void {
    if (!values) return;
    setTimeout(() => {
      Object.keys(values).forEach(key => {
        this.form.get(key)?.patchValue(values[key]);
      })
    })
  }

  submit(): void {
    const values = this.form.value;
    this.submitHandler.emit(values)
  }

}
