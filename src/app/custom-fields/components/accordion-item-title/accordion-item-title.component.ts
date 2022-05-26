import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cf-accordion-item-title',
  templateUrl: './accordion-item-title.component.html',
  styleUrls: ['./accordion-item-title.component.scss']
})
export class AccordionItemTitleComponent implements OnInit {

  @Input() itemTitle: string = 'Item';
  @Input() index: number = 0;
  @Input() dragDisabled = false;
  constructor() { }

  ngOnInit(): void {
  }

}
