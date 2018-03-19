import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ServiceComponent } from './service/service.component';
import { DisplayEventsComponent } from './display-events/display-events.component';
import { appRoutes } from './service/route';
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditItemComponent } from './edit-item/edit-item.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent,
    AddNewComponent,
    DisplayEventsComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,ToastModule.forRoot(),
    FormsModule
  ],
  providers: [ServiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
