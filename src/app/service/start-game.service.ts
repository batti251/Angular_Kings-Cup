import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { Game } from '../models/game-model';
import { Router} from '@angular/router';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StartGameService {

  firestore: Firestore = inject(Firestore);
  items$;
  game!: Game;
  newGame: any;

  constructor(private router: Router) {
    this.items$ = this.getGameRef()
  }


  async updateCardEffect(effectObj:{}, docId:string){
  await updateDoc(this.getDocRef("games", docId), {
    'cardEffect' : effectObj
  })
    
  }

 async setPickCardFlag(flag:boolean, docId:string){
    await updateDoc(this.getDocRef("games", docId), {
      'pickCard': flag
    })
  }

  getCurrentPlayers(name: string) {
    collectionData(this.items$, { idField: 'id' }).pipe(take(1)).subscribe(game => {
    let filteredArray: any
        filteredArray = game.filter(room => {return room['players'].length < 4})
      if (filteredArray.length > 0 ) {
        this.addPlayerToGame(name, filteredArray[0].id)
      } else {
        this.addNewGame();
        this.openNewGameLounch(name);
      }
    }) 

  }

  async addPlayerToGame(player: string, docId: string) {
    await updateDoc(this.getDocRef("games", docId), {
      'players': arrayUnion(player)
    })
   this.router.navigateByUrl('/game/'+docId)
  }

  async updatePlayerCard(playerCard:string, docId:string){
    await updateDoc(this.getDocRef("games", docId), {
      'playerCard':playerCard
    })
  }

  addNewGame() {
    this.game = new Game()
    return this.newGame = this.game.toJSON()
  }

  async openNewGameLounch(name:string) {
    let newDoc = await addDoc(collection(this.firestore, "games"), this.newGame)
    await this.addPlayerToGame(name, newDoc.id)
  }


  async deleteDrawedCardFromCardStackFirebase(drawedCard: string, gameId: string) {
    await updateDoc(this.getDocRef("games", gameId), {
      'cardStack': arrayRemove(drawedCard)
    })
  }

  async addDrawedCardToDiscardPileFirebase(drawedCard: string, gameId: string) {
    await updateDoc(this.getDocRef("games", gameId), {
      'discardPile': arrayUnion(drawedCard)
    })
  }

  async nextPlayersTurn(nextPlayer: number, gameId: string) {
    await updateDoc(this.getDocRef("games", gameId), {
      'currentPlayer': nextPlayer
    })
  }

  /**
   * Angular method that is called after the component was initialized
   */
  ngOnInit(): void {
  }

  // holt mir /game
  getGameRef() {
    return collection(this.firestore, "games")
  }

  // holt mir /game/player2
  getDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }
}
