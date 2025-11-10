import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { StartGameService } from '../service/start-game.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule,  MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {

  name: string = ''
  game = inject(StartGameService)
    constructor(public dialog: MatDialog, private router: Router){
    }

    
  ngOnInit():void{
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (!name) {
      } else { console.log(name) 
          this.game.addPlayerToGame(name)
          this.startGame()
      }
    });
  }

  startGame(){
   this.router.navigateByUrl('/game');
  }

}
