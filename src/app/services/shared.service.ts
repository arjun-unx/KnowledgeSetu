import { Injectable } from '@angular/core';
import {MainComponent} from '../main/main.component'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
model={}
  setData(studentLearning){
    this.model=studentLearning

  }

  getData(){
    return this.model
  }

 
}
