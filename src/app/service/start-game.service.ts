import { Component, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Firestore, collectionData, collection, doc} from '@angular/fire/firestore';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class StartGameService{
    
  firestore: Firestore = inject(Firestore);
  items$;
  


  constructor() { 
    this.items$ = this.getGameRef()
    console.log(this.items$);
    console.log('test');
    
    collectionData(this.items$).subscribe(game => {
      console.log(game)
    })
    }

      
  // holt mir /game
  getGameRef(){
    return collection(this.firestore, "games")
  }

  // holt mir /game/player2
  getDocRef(colId:string, docId:string){
    console.log(doc(collection(this.firestore, colId), docId));
    
    return doc(collection(this.firestore, colId), docId)
  }
}
