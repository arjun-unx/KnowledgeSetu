import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.scss']
})
export class TeacherHeaderComponent implements OnInit {

  constructor(private cookieService:CookieService,private http:HttpClient,private router:Router,private teacherservice:TeacherService) { }

  logout=()=>{
    this.teacherservice.signOut();
      
  }


  ngOnInit(): void {
  }

}
