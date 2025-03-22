import { Component, OnInit, inject } from '@angular/core';
import { TubeComponent } from './components/tube/tube.component';
import { ITube } from './components/tube/tube.interface';
import { TubeService } from './components/tube/tube.service';
import { PlayerService } from './player.service';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { IGameForm } from './components/side-panel/side-panel.interface';

@Component({
  selector: 'app-root',
  imports: [TubeComponent, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {



  tubeService = inject(TubeService);
  playerService = inject(PlayerService);

  ngOnInit(): void {
    // generate tubes
    this.tubeService.generateTubes();
    this.tubeService.randomizeTubeData();
  }

  undoClicked(){
    this.playerService.isWin = false;
    this.tubeService.undo();
  }

  tubeClicked(id: number){
    const tube = this.tubeService.tubeData.find((tubeItem: ITube)=>id===tubeItem.id);
    if(!tube) return;
    if(this.playerService.playerChoice === null){
      this.playerService.playerChoice = tube;
    }else{
      // add to stack
      this.tubeService.addMoveToStack(JSON.parse(JSON.stringify(this.playerService.playerChoice)),JSON.parse(JSON.stringify(tube)));
      // fill
      this.tubeService.fill(this.playerService.playerChoice,tube);
      // clear animation
      this.playerService.playerChoice.isActive = false;
      this.tubeService.tubeData[this.tubeService.tubeData.findIndex((tubeItem: ITube)=>id===tubeItem.id)].isActive = false;
      // clear player choice
      this.playerService.clear();
      this.playerService.addMove();
      this.playerService.isWin = this.tubeService.checkPlayerWin(this.tubeService.tubeData);
    }
  }

  resetClicked(event: IGameForm){
    this.tubeService.resetValues(event);
    this.playerService.resetValues();
    this.ngOnInit();
  }
}
