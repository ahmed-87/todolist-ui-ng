import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import Todo from '../../todo';

@Component({
  selector: 'td-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit ,OnDestroy {

  constructor() { }

  @Input() todo: Todo;
  
  completedMap: any  = new Map()
  
 
  ngOnInit() {
    if(window.location.pathname.includes("/to-do-list")){
      console.log('New Item');
    }
    this.completedMap.set(true,  "COMPLETED");
    this.completedMap.set(false,  "NOT COMPLETED");
  }




  ngOnDestroy(){
    if(window.location.pathname.includes("/to-do-list")){
      console.log("Item removed");
    }
  }
}
