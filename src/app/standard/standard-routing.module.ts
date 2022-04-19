import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import { FifthComponent } from './fifth/fifth.component';
import { SixthComponent } from './sixth/sixth.component';
import { SeventhComponent } from './seventh/seventh.component';
import { EigthComponent } from './eigth/eigth.component';
import { NinethComponent } from './nineth/nineth.component';
import { TenthComponent } from './tenth/tenth.component';
import { EleventhComponent } from './eleventh/eleventh.component';
import { TwelfthComponent } from './twelfth/twelfth.component';
const routes: Routes = 
[
      
       { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent },
    { path: 'third', component: ThirdComponent },
    { path: 'fouth', component: FourthComponent },
    { path: 'fifth', component: FifthComponent },
    { path: 'sixth', component: SixthComponent },
    { path: 'seventh', component: SeventhComponent },
    { path: 'eigth', component: EigthComponent },
    { path: 'nineth', component: NinethComponent },
    { path: 'tenth', component: TenthComponent },
    { path: 'eleventh', component: EleventhComponent },
    { path: 'twelfth', component: TwelfthComponent }
  
  ];
    


@NgModule({
    imports: [RouterModule.forChild(routes),CommonModule],
    exports: [RouterModule]
})
export class StandardRoutingModule { }
