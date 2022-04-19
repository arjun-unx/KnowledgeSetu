import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {

  VideoForm:{
    
    Class:string,
    Subject:string
  }
  FileURL=[]
  file=[]
  document=[]
  documenturl=[]
  id: string;
  listRef: any;
  Sub:string;
  VideoFiles: any[];
  docref: any;
  Showlist: any=[];
  ClassData: any=[];
  actualData: any=[];
  
  constructor(private cookieService:CookieService,public http: HttpClient,public firestore:AngularFirestore,
    public Storage:AngularFireStorage, private route:ActivatedRoute,private router:Router,) { 
    this.VideoForm={   
      Class:"",
      Subject:""
    }
  }

   /*this is below function is used to change the data dynamically in select tag */
   

  /* the below fuction is used for the select fees and payment from sortlist object */
  
  //below function is called when show video button is clicked
  //this fucntion is used for the download the data from the storage 
  showVideos(){
    this.Sub=this.VideoForm.Subject;
    console.log(this.VideoForm)
    this.FileURL=[]
    this.file=[]
    this.document=[]
    this.documenturl=[]
    //the below listRef and docref is a variable used to pass the path form where the data is download 
    this.listRef = this.Storage.storage.ref(`videos/${this.id}/${this.VideoForm.Class}/${this.VideoForm.Subject}/videos`);
    this.docref = this.Storage.storage.ref(`videos/${this.id}/${this.VideoForm.Class}/${this.VideoForm.Subject}/document`);
    this.listRef.listAll().then((res) =>{
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        //below code push all the file names into file array
        this.file.push(itemRef.name)
        //below code push all the file's excess url to the FileURL array
        this.getFilesURL(itemRef).then(res=>{
          this.FileURL.push(res)
        })     
      });
    }).catch((error) => {
    })

    //this code for fetch the document from storage 
    this.docref.listAll().then((res)=>{
      res.items.forEach((itemref) =>{
        this.document.push(itemref.name)
        this.getDocUrl(itemref).then(res=>{
          this.documenturl.push(res);
        })
      })
    }).catch((error)=>{

    })
  }

  //this function is used to fetch document url from storage
  getDocUrl(itemref){
    return itemref.getDownloadURL().then(function(url){
      return url;
    })
  }

  //this is the fucntion is used to fetch videos url form storage
  getFilesURL(itemRef){

    return itemRef.getDownloadURL().then(function(url){
      return url

  })
  }

  //below code is used for delete the documents form the storage
  documentdelete(docUrl){
    //docUrl contains the url of the documents
    this.Storage.storage.refFromURL(docUrl).delete().then((res)=>{
      window.location.reload();
    }).catch((error)=>{

    });

  }

  //below code is used for delete the video from the storage
  videodelete(videoUrl){
    this.Storage.storage.refFromURL(videoUrl).delete().then((res)=>{
      window.location.reload();
    }).catch((error)=>{

    })
  }

  ngOnInit(): void {

    const cookieCheck:boolean=this.cookieService.check('Educator')
    //console.log(cookieCheck)
    if(!cookieCheck)
    {
      this.router.navigate(['/'])
    }else{
      this.id=this.cookieService.get('Educator')
      //console.log(this.id);
    }
    

  }

}  
