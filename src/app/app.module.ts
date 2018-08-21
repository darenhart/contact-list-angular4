import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PeopleComponent } from './people.component';
import { BracketsComponent } from './brackets.component';
import { FilterPipe} from './pipe/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    PeopleComponent,
    BracketsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [PeopleComponent, BracketsComponent]
})
export class AppModule { }
