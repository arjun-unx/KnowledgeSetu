import { NgModule } from '@angular/core';
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
import { Routes, RouterModule } from '@angular/router';
import { StandardRoutingModule } from './standard-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [FirstComponent, SecondComponent, ThirdComponent, FourthComponent, FifthComponent, SixthComponent, SeventhComponent, EigthComponent, NinethComponent, TenthComponent, EleventhComponent, TwelfthComponent],
  imports: [
    CommonModule,
    StandardRoutingModule,
    BrowserModule,
    HttpClientModule

  ]
})
export class StandardModule { }
