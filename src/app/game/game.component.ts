import { Component, OnInit,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game-model';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { GameCardEffectComponent } from '../game-card-effect/game-card-effect.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardEffectsService } from '../service/card-effects.service';
import {  Firestore, collectionData, collection } from '@angular/fire/firestore';
import { StartGameService } from '../service/start-game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PlayerComponent, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, GameCardEffectComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCard = false;
  drawedCard = false;
  newCard: string | undefined = '';
  stackedCard: string | undefined = '';
  prepareGame = inject(StartGameService);


  constructor(public dialog: MatDialog, private router: Router) {
              this.prepareGame.getGameRef()
          collectionData(this.prepareGame.items$).subscribe(game => {
            console.log(game)
          })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (!name) {
      } else { this.game.players.push(name); }
    });
  }


  /**
   * Angular method that is called after the component was initialized
   * It starts a new Game
   */
  ngOnInit(): void {
    this.newGame();
    //this.prepareGame.getGameRef().add({'HAllo': 'Welt'})
  }

  /**
   * This Function assigns a new Game-Object to the variable game
   */
  newGame() {
    this.game = new Game()


  }


  /**
   * This Function 
   */
  drawCard() {
    if (!this.pickCard) {
      this.newCard = this.game.cardStack.pop();
      this.pickCard = true;
      setTimeout(() => {
        this.pickCard = false;
        this.newCard ? this.game.discardPile.push(this.newCard) : this.newCard
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1500);
    }
  }
}
