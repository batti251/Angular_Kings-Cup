import { Component, OnInit, Input, OnChanges, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { log } from 'node:console';
import { CardEffectsService } from '../service/card-effects.service';

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


  title = '';
  description = '';



  constructor(){
  }

  
  ngOnInit(): void {

  }
  

  ngOnChanges(): void {
    let cardNumber = this.card ? +this.card?.split('_')[1] :0;
    this.title = cardNumber? this.effects.cardAction[cardNumber -1].title  : "";
    this.description = cardNumber? this.effects.cardAction[cardNumber -1].description  : "";
    
  }
  
}
