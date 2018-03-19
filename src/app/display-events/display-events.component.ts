import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { ItemsInfo } from "../service/properties";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-display-events',
  templateUrl: './display-events.component.html',
  styleUrls: ['./display-events.component.css']
})
export class DisplayEventsComponent implements OnInit {
  response: ItemsInfo[];
  getResponse: ItemsInfo[];
  url : string;

  constructor
    (
    private appService: ServiceComponent,
    private _router: Router,
    private dynamicRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.appService.getlistItems("/_api/web/lists/getByTitle('SP CRUD')/items?")
      .subscribe((data: any) => {
        this.response = data.d.results;
      });
  }
}
