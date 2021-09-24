import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history = [];
  constructor(private sharedService: SharedService) {
    this.history = sharedService.history;
  }

  ngOnInit() {
  }

}
