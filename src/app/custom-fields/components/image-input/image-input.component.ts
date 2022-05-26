import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cf-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  @Input() imageSrc: string = '';
  @Input() required = false;
  @Output() addImage: EventEmitter<void> = new EventEmitter<void>()
  @Output() removeImage: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  remove(): void {
    if (confirm('You really want to delete the image?')) {
      this.removeImage.emit()
    }
  }

}
