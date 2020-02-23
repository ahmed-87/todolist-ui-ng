import { Component, OnInit, Input } from '@angular/core';
import Todo from '../../todo';

@Component({
  selector: 'td-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor() { }

  @Input() todo: Todo;
  
  completedMap: any  = new Map()
  
 
  ngOnInit() {
    this.completedMap.set(true,  "COMPLETED");
    this.completedMap.set(false,  "NOT COMPLETED");
  }

}
