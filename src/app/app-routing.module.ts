import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldsPageComponent } from './pages/pages/fields-page/fields-page.component';
import { ValuesPageComponent } from './pages/pages/values-page/values-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'fields', pathMatch: 'full'},
  { path: 'fields', component: FieldsPageComponent },
  { path: 'values', component: ValuesPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
