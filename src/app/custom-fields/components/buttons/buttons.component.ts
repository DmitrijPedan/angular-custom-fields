import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() showArrayControls: boolean = false;
  @Input() showAdd: boolean = true;
  @Input() confirmRemoveField: boolean = true;
  @Output() addField: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeField: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearArray: EventEmitter<void> = new EventEmitter<void>();
  @Output() openAll: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeAll: EventEmitter<void> = new EventEmitter<void>();

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
