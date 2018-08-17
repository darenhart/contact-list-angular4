import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BracketsComponent } from './brackets.component';
import { FilterPipe} from './pipe/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    BracketsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent, BracketsComponent]
})
export class AppModule { }
