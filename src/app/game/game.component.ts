import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
import { GameCardEffectComponent } from '../game-card-effect/game-card-effect.component';
import { docData } from '@angular/fire/firestore';
import { StartGameService } from '../service/start-game.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameCardEffectComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCard = false;
  drawedCard = false;
  newCard: string | undefined = '';
  stackedCard: string | undefined = '';
  prepareGame = inject(StartGameService);
  gameID: any;
  game!: any


  constructor(private route: ActivatedRoute, private router: Router) {

  }


  async ngOnInit() {
     this.route.params.subscribe((params) => {
      this.gameID = params['id']
      let docRef = this.prepareGame.getDocRef("games", this.gameID)
      docData(docRef).subscribe( game => {
      this.game = game
      })
    });
  }


  drawCard() {
    if (!this.pickCard) {
      this.newCard = this.game.cardStack.pop();
      this.game.drawedCard = this.newCard
      this.prepareGame.updatePlayerCard(this.game.drawedCard, this.gameID)
      this.prepareGame.deleteDrawedCardFromCardStackFirebase(this.newCard!, this.gameID)
      this.prepareGame.setPickCardFlag(true, this.gameID)
      setTimeout(() => {
        this.prepareGame.setPickCardFlag(false, this.gameID)
        this.newCard ? this.prepareGame.addDrawedCardToDiscardPileFirebase(this.newCard, this.gameID) : this.newCard
        this.nextPlayersTurn()
      }, 1500);
    }
  }

  nextPlayersTurn() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.prepareGame.nextPlayersTurn(this.game.currentPlayer, this.gameID)
  }
}
