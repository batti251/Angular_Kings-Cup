import { Component, OnInit,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game-model';
import { PlayerComponent } from '../player/player.component';
import { GameCardEffectComponent } from '../game-card-effect/game-card-effect.component';
import { CardEffectsService } from '../service/card-effects.service';
import {  Firestore, collectionData, collection } from '@angular/fire/firestore';
import { StartGameService } from '../service/start-game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,PlayerComponent, GameCardEffectComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent{
  game!: Game;
  pickCard = false;
  drawedCard = false;
  newCard: string | undefined = '';
  stackedCard: string | undefined = '';
  prepareGame = inject(StartGameService);


  constructor(private router: Router) {
          this.prepareGame.getGameRef()
          collectionData(this.prepareGame.getGameRef()).subscribe(game => {
            this.game = game[0]['newGame']
            

          })
  }


 
  ngOnInit(): void {
    this.prepareGame.newGame();
    
    //this.prepareGame.getGameRef().add({'HAllo': 'Welt'})
  }
/* 
  newGame() {
    this.game = new Game()
  } */


  /**
   * This Function 
   */
  drawCard() {
   if (!this.pickCard) {
     this.newCard = this.game.cardStack.pop();
     this.prepareGame.deleteDrawedCardFromFirebase(this.newCard!)
     this.pickCard = true;
     setTimeout(() => {
       this.pickCard = false;
       this.newCard ? this.prepareGame.game.discardPile.push(this.newCard) : this.newCard
       this.prepareGame.game.currentPlayer++;
       this.prepareGame.game.currentPlayer = this.prepareGame.game.currentPlayer % this.prepareGame.game.players.length;
     }, 1500);
   }
  }
}
