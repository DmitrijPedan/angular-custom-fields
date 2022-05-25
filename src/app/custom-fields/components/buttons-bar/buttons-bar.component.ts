import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cf-buttons-bar',
  templateUrl: './buttons-bar.component.html',
  styleUrls: ['./buttons-bar.component.scss']
})
export class ButtonsBarComponent implements OnInit {

  @Input() title = '';
  @Input() matIcon = '';
  @Input() showArrayControls: boolean = false;
  @Input() showAdd: boolean = true;
  @Input() confirmRemoveField: boolean = true;
  @Input() reorderDisabled: boolean = true;
  @Output() addField: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeField: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearArray: EventEmitter<void> = new EventEmitter<void>();
  @Output() openAll: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeAll: EventEmitter<void> = new EventEmitter<void>();
  @Output() reorderArray: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  removeFieldAction(): void {
    if (this.confirmRemoveField && !confirm('Are you sure you want to remove this field?')) {
      return;
    }
    this.removeField.emit();
  }

  clearAllAction(): void {
    if (confirm('Are you sure you want to remove all fields?')) {
      this.clearArray.emit()
    }
  }

}
