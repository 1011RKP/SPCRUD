import { RouterModule, Routes, Route } from '@angular/router'

import { EditItemComponent } from '../edit-item/edit-item.component';
import { AppComponent } from "../app.component";
import { AddNewComponent } from '../add-new/add-new.component';
import { DisplayEventsComponent } from '../display-events/display-events.component';

export const appRoutes: Routes = [
    //{ path: 'home', component: AppComponent },
    { path: 'displayItem', component: DisplayEventsComponent },
    { path: 'newItem', component: AddNewComponent },    
    { path: 'editItem/:id', component: EditItemComponent },
    { path: '', redirectTo: '/displayItem', pathMatch: 'full' }
]