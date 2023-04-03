import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { NgChartsModule } from "ng2-charts"

import { FileUploadModule } from "primeng/fileupload"
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from "./app.component"
import { ListboxModule } from "primeng/listbox"
import { ChartModule } from "primeng/chart"
import { DropdownModule } from "primeng/dropdown"
import { ButtonModule } from "primeng/button"
import { InputNumberModule } from "primeng/inputnumber"
import { SelectButtonModule } from "primeng/selectbutton"

import { DragDropModule } from "primeng/dragdrop"
import { PanelModule } from "primeng/panel"
import { TableModule } from "primeng/table"
import { TabViewModule } from "primeng/tabview"
import { MultiSelectModule } from "primeng/multiselect"
import { FormsModule } from "@angular/forms"

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { SplitterModule } from "primeng/splitter"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgChartsModule,
    ButtonModule,
    InputNumberModule,
    SelectButtonModule,
    DragDropModule,
    FormsModule,
    MultiSelectModule,
    PanelModule,
    TableModule,
    TabViewModule,
    FileUploadModule,
    BrowserAnimationsModule,
    SplitterModule,
    ListboxModule,
    DropdownModule,
    ChartModule,
    HttpClientModule,
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
