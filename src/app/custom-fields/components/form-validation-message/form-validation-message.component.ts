import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'cf-form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.scss']
})
export class FormValidationMessageComponent implements OnInit {

  @Input() control!: AbstractControl | null;
  @Input() name!: string;
  @Input() min!: number;
  @Input() max!: number;
  @Input() minlength!: number | undefined;
  @Input() maxlength!: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
