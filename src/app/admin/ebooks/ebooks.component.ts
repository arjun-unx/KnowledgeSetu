import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.scss']
})
export class EbooksComponent implements OnInit {
  id: any;
  videoFile: any;
  documentFile: any;
  documentPath: any;
  videoPath: any;
  videoNumber: number
  docNumber: number;
  videoURL: string;
  documentURL: string
  uploadProgress: Observable<number>
  documentUploadProgress: Observable<number>
  url: string
  alert: string;
  message: string;
  model = {
    class: "",
    Subjectname: "",
  }

  content = {
    id: "",
    VideoPath: "",
    VideoURL: "",
    DocumentPath: "",
    DocumentURL: "",
    Subject: "",
    Class: "",
    Classid: "",
  }
  Showlist: any = [];
  ExistPath: Boolean
  UpdatePath: string;
  Checklist: any = [];
  check: boolean = true;

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router, public firestore: AngularFirestore,
    public storage: AngularFireStorage) {
    for (let x in this.Showlist) {
      //console.log(x)
    }
  }

  /* this fuction is used to handle the videos files call from html page*/
  handlevideofile(event) {
    this.videoFile = event.target.files[0]
    console.log(this.videoFile.name)
  }

  /* this function is used to handle the document files call from html page*/
  handledocumentfile(event) {
    this.documentFile = event.target.files[0]
    console.log(this.documentFile)
  }

  UploadExist(videoPath) {
    return this.firestore.collection('Freecontent').ref.where('VideoPath', '==', videoPath).get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          this.ExistPath = true
        }
      })
    })
  }

  /* this function used to upload videos and document to firebase */
  onSubmit = () => {
    if (this.videoFile == null || this.documentFile == null) {
      this.alert = "please select the files";
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      this.ExistPath = false
      this.alert = "";
      this.model.Subjectname = this.model.Subjectname.charAt(0).toUpperCase() + this.model.Subjectname.slice(1)
      this.videoPath = "videos/" + this.id + "/" + this.model.class + "/" + this.model.Subjectname + "/videos/" + this.videoFile.name
      this.documentPath = "videos/" + this.id + "/" + this.model.class + "/" + this.model.Subjectname + "/document/" + this.documentFile.name
      this.UploadExist(this.videoPath).then(() => {
        if (!this.ExistPath) {
          this.content.VideoPath = this.videoPath
          this.content.DocumentPath = this.documentPath
          this.content.Class = this.model.class
          this.content.Subject = this.model.Subjectname
          this.content.Classid = this.id + "_" + this.model.class + "_" + this.model.Subjectname
          const vStorageRef = this.storage.ref(this.videoPath)
          const dStorageRef = this.storage.ref(this.documentPath)
          const Vtask = this.storage.upload(this.videoPath, this.videoFile)
          const Dtask = this.storage.upload(this.documentPath, this.documentFile);


          Vtask.snapshotChanges().pipe(

            finalize(() => {
              vStorageRef.getDownloadURL().subscribe(url => {
                console.log(url)
                this.videoURL = url
                this.content.VideoURL = url
                this.set_Data(this.model.class, this.model.Subjectname);
              })
            })
          ).subscribe()


          Dtask.snapshotChanges().pipe(

            finalize(() => {
              dStorageRef.getDownloadURL().subscribe(url => {
                console.log(url)
                this.documentURL = url
                this.content.DocumentURL = url
              })
            })
          ).subscribe()


          this.uploadProgress = Vtask.percentageChanges()
          this.documentUploadProgress = Dtask.percentageChanges()

          this.uploadProgress.subscribe(res => {
            this.videoNumber = res
          })

          this.documentUploadProgress.subscribe(res => {
            this.docNumber = res
          })

        }
        else {
          this.alert = "Video Already Exists"
        }
      })
    }
  }




  set_Data(upclass, upsubject) {
    this.Checklist.forEach(doc => {
    if (doc.Classid === this.content.Classid) {
         this.content.id = this.id
         //this.UpdatePath=this.id+"_"+upclass+"_"+upsubject;
         this.firestore.collection('Freecontent').add(this.content).then((res) => {
           //this.firestore.collection('TeacherClasses').doc(this.UpdatePath).set({Fees: this.uploadDetails.Fees});
         })
     }
   });
    if (this.check) {
      this.content.id = this.id
      //this.UpdatePath=this.id+"_"+upclass+"_"+upsubject;
      this.firestore.collection('Freecontent').add(this.content).then((res) => {
        //this.firestore.collection('TeacherClasses').doc(this.UpdatePath).set({Fees: this.uploadDetails.Fees});
      })
    }
  }





  ngOnInit(): void {
    window.scroll(0, 0)

    const cookieCheck: boolean = this.cookieService.check('Admin')
    if (!cookieCheck) {
      this.router.navigate(['/'])
    } else {
      this.id = this.cookieService.get('Admin')
      this.firestore.collection('Freecontent').ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Checklist.push(doc.data())
          console.log(this.Checklist)
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }

  }

}





















