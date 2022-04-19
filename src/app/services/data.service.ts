import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {Uploaded_List} from '../models/Uploaded_List'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  itemsCollection:AngularFirestoreCollection<Uploaded_List>
  items:Observable<Uploaded_List[]>

  constructor(public firestore:AngularFirestore) { 
  }

  getVideos(model)
  {
    return this.firestore.collection('UploadedVideos').ref.where('Class','==',model).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return doc.data()
          
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
     
}

}

