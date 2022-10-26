import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveSearchComponent } from './live-search/live-search.component';

const routes: Routes = [{
  path: '',
  component: LiveSearchComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
