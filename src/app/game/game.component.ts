import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game-model';
import { log } from 'node:console';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCard = false;
  drawedCard = false;
  newCard:string | undefined = '';

  constructor() {

  }

  /**
   * Angular method that is called after the component was initialized
   * It starts a new Game
   */
  ngOnInit(): void {
    this.newGame();
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
    this.newCard = this.game.cardStack.pop();
    this.pickCard = true;
    console.log(this.game.cardStack);
  }
}
