import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  id: any;
  name: "";
  payment: boolean;
  videoFile: any;
  documentFile: any;
  documentPath: any;
  videoNumber: number
  docNumber: number;
  videoURL: string;
  documentURL: string
  Path: any;
  uploadProgress: Observable<number>
  documentUploadProgress: Observable<number>
  url: string
  alert: string;
  message: string;
  model = {
    class: "",
    Subjectname: "",
  }

  uploadDetails = {
    id: "",
    Name: "",
    VideoPath: "",
    VideoURL: "",
    DocumentPath: "",
    DocumentURL: "",
    Subject: "",
    Class: "",
    Fees: "",
    AdminFees: "",
    package: "",
    Classid: "",
    Adminpayment: false
  }
  newclassid: string;
  uploadedlist: any = [];
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
    //console.log(this.videoFile.name)
  }

  /* this function is used to handle the document files call from html page*/
  handledocumentfile(event) {
    this.documentFile = event.target.files[0]
    //console.log(this.documentFile)
  }

  UploadExist(path) {
    return this.firestore.collection('UploadedVideos').ref.where('VideoPath', '==', path).get().then((querySnapshot) => {
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
      this.Path = "videos/" + this.id + "/" + this.model.class + "/" + this.model.Subjectname + "/videos/" + this.videoFile.name
      this.documentPath = "videos/" + this.id + "/" + this.model.class + "/" + this.model.Subjectname + "/document/" + this.documentFile.name
      this.UploadExist(this.Path).then(() => {
        if (!this.ExistPath) {
          this.uploadDetails.VideoPath = this.Path
          this.uploadDetails.DocumentPath = this.documentPath
          this.uploadDetails.Class = this.model.class
          this.uploadDetails.Subject = this.model.Subjectname
          this.uploadDetails.Name = this.name
          this.uploadDetails.Classid = this.id + "_" + this.model.class + "_" + this.model.Subjectname
          const videoStorageRef = this.storage.ref(this.Path)
          const docStorageRef = this.storage.ref(this.documentPath)
          const task = this.storage.upload(this.Path, this.videoFile)
          const docTask = this.storage.upload(this.documentPath, this.documentFile)

          task.snapshotChanges().pipe(

            finalize(() => {
              videoStorageRef.getDownloadURL().subscribe(url => {
                this.videoURL = url
                this.uploadDetails.VideoURL = url
                this.set_Data(this.model.class, this.model.Subjectname);
              })
            })
          ).subscribe()


          docTask.snapshotChanges().pipe(

            finalize(() => {
              docStorageRef.getDownloadURL().subscribe(url => {
                console.log(url)
                this.documentURL = url
                this.uploadDetails.DocumentURL = url
              })
            })
          ).subscribe()


          this.uploadProgress = task.percentageChanges()
          this.documentUploadProgress = docTask.percentageChanges()

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
      if (doc.Classid === this.uploadDetails.Classid) {
        this.check = false;
        this.uploadDetails.Adminpayment = true;
        this.uploadDetails.AdminFees = doc.AdminFees;
        this.uploadDetails.Fees = doc.Fees;
        this.uploadDetails.id = this.id
        //this.UpdatePath=this.id+"_"+upclass+"_"+upsubject;
        this.firestore.collection('UploadedVideos').add(this.uploadDetails).then((res) => {
          //this.firestore.collection('TeacherClasses').doc(this.UpdatePath).set({Fees: this.uploadDetails.Fees});
        })
      }
    });
    if (this.check) {
      this.uploadDetails.id = this.id
      //this.UpdatePath=this.id+"_"+upclass+"_"+upsubject;
      this.firestore.collection('UploadedVideos').add(this.uploadDetails).then((res) => {
        //this.firestore.collection('TeacherClasses').doc(this.UpdatePath).set({Fees: this.uploadDetails.Fees});
      })
    }
  }





  ngOnInit(): void {
    window.scroll(0, 0)

    const cookieCheck: boolean = this.cookieService.check('Educator')
    if (!cookieCheck) {
      this.router.navigate(['/'])
    } else {
      this.id = this.cookieService.get('Educator')

      this.firestore.collection('Teacher').doc(this.id).ref.get().then(doc => {
        if (doc.exists) {
          this.name = doc.data()["fullName"]
          //this.payment=doc.data()["Payment"]
          //console.log(this.name)

        }
      }).catch(_error => {
        console.log(_error.message)
      })
      this.firestore.collection('UploadedVideos').ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Checklist.push(doc.data())
          //console.log(this.Checklist)
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }

  }

}

