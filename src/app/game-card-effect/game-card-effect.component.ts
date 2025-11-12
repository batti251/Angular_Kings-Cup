import { Component, OnInit, Input, OnChanges, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CardEffectsService } from '../service/card-effects.service';
import { StartGameService } from '../service/start-game.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { Firestore, collectionData, collection, docData, doc } from '@angular/fire/firestore';
import { log } from 'node:console';


@Component({
  selector: 'app-game-card-effect',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-card-effect.component.html',
  styleUrl: './game-card-effect.component.scss'
})
export class GameCardEffectComponent implements OnInit, OnChanges{
  @Input() card!: string | undefined;
  @Input() info!: string;

  effects = inject(CardEffectsService)
  prepareGame = inject(StartGameService);
  gameID = ''
  title = ''
  description = ''
  game: any


  constructor(private route: ActivatedRoute){
    this.route.params.subscribe((params) => {
      this.gameID = params['id']
      let docRef = this.prepareGame.getDocRef("games", this.gameID)
     docData(docRef).subscribe( game => {
          this.game = game
          })
        });
      }
    
  
  ngOnInit(): void {
    this.prepareGame
  }
  

  ngOnChanges(): void {
    let cardNumber = this.card ? +this.card?.split('_')[1] :0;
    let cardIndex = cardNumber -1
    if(cardNumber){
      let effectObj = this.effects.showCardEffect(cardIndex)
      this.prepareGame.updateCardEffect(effectObj, this.gameID)
    }
  }
  
}
