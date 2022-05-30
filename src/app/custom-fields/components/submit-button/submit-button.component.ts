import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'cf-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {

  @Input() show = true;
  @Input() disabled = true;
  @Input() showCancel = true;
  @Output() submitHandler: EventEmitter<void> = new EventEmitter<void>()
  @Output() cancelHandler: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}
