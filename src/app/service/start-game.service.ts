import { Component, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Firestore, collectionData, collection, doc, addDoc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { log } from 'node:console';
import { Game } from '../models/game-model';


@Injectable({
  providedIn: 'root'
})
export class StartGameService {

  firestore: Firestore = inject(Firestore);
  items$;
  game!: Game;



  constructor() {
    this.items$ = this.getGameRef()
    collectionData(this.items$).subscribe(game => {
    })
  }

  /*     const docRef = await addDoc(collection(db, "cities"), {
    name: "Tokyo",
    country: "Japan"
  }); */


  async addPlayerToGame(player: string) {
    await updateDoc(this.getDocRef("games", 'cJsSBX35kU51b1StZniN'), {
      'newGame.players': arrayUnion(player)
    }), {

    }
    await this.newGame()
  }

  async deleteDrawedCardFromCardStackFirebase(drawedCard:string){
    await updateDoc(this.getDocRef("games", 'cJsSBX35kU51b1StZniN') , {
      'newGame.cardStack': arrayRemove(drawedCard)
    })
  }

  async addDrawedCardToDiscardPileFirebase(drawedCard:string){
     await updateDoc(this.getDocRef("games", 'cJsSBX35kU51b1StZniN'), {
      'newGame.discardPile': arrayUnion(drawedCard)
    })
  }

  async nextPlayersTurn(nextPlayer:number){
    await updateDoc(this.getDocRef("games", 'cJsSBX35kU51b1StZniN'), {
      'newGame.currentPlayer': nextPlayer
    })
  }

  /**
   * Angular method that is called after the component was initialized
   * It starts a new Game
   */
  ngOnInit(): void {

    //this.prepareGame.getGameRef().add({'HAllo': 'Welt'})
  }



  /**
   * This Function assigns a new Game-Object to the variable game
   */
  async newGame() {
    this.game = new Game()
  }

  // holt mir /game
  getGameRef() {
    return collection(this.firestore, "games")
  }

  // holt mir /game/player2
  getDocRef(colId: string, docId: string) {
    console.log(doc(collection(this.firestore, colId), docId));

    return doc(collection(this.firestore, colId), docId)
  }
}
