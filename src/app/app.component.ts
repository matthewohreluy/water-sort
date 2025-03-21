import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TubeComponent } from './components/tube/tube.component';
import { DEFAULT_NOOFTUBES, DEFAULT_TUBE, COLOR_CONTENT, DEFAULT_NOOFEMPTYTUBES } from './constants/default';
import { ITube } from './components/tube/tube.interface';
import { TubeService } from './components/tube/tube.service';
import { MathService } from './math.service';
import { PlayerService } from './player.service';
import { SidePanelComponent } from './components/side-panel/side-panel.component';

@Component({
  selector: 'app-root',
  imports: [TubeComponent, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  noOfTubes: number = DEFAULT_NOOFTUBES;
  tubeData: ITube[] = [];
  noOfEmptyTubes: number = DEFAULT_NOOFEMPTYTUBES;
  swaps: number = 200;
  isWin: boolean = false;


  tubeService = inject(TubeService);
  mathService = inject(MathService);
  playerService = inject(PlayerService);

  ngOnInit(): void {
    // generate tubes
    this.tubeData = Array.from({length: this.noOfTubes + this.noOfEmptyTubes}, (_, i)=>({
      id: i + 1,
      contents: this.noOfTubes > i ? [i+1,i+1,i+1,i+1] : [0,0,0,0],
      isActive: false
    }))

   for(let x = 0; x<this.swaps; x++){
    this.tubeService.swap(
      this.tubeData[this.mathService.randomize(0,this.noOfTubes-1)],
      this.tubeData[this.mathService.randomize(0,this.noOfTubes-1)],
      this.mathService.randomize(0,3))
   }
  }

  tubeClicked(id: number){
    const tube = this.tubeData.find((tubeItem: ITube)=>id===tubeItem.id);
    if(!tube) return;
    if(this.playerService.playerChoice === null){
      this.playerService.playerChoice = tube;
    }else{
      // fill
      this.tubeService.fill(this.playerService.playerChoice,tube);
      // clear animation
      this.playerService.playerChoice.isActive = false;
      this.tubeData[this.tubeData.findIndex((tubeItem: ITube)=>id===tubeItem.id)].isActive = false;
      // clear player choice
      this.playerService.clear();
      this.playerService.addMove();
      this.isWin = this.tubeService.checkPlayerWin(this.tubeData);
    }
  }

  resetClicked(event: {noOfTubes: number, noOfEmptyTubes: number, swaps: number}){
    this.tubeData = [];
    this.noOfTubes = event.noOfTubes;
    this.noOfEmptyTubes = event.noOfEmptyTubes;
    this.swaps = event.swaps;
    this.ngOnInit();
  }
}
