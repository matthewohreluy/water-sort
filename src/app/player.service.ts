import { Injectable } from "@angular/core";
import { ITube } from "./components/tube/tube.interface";


@Injectable({
  providedIn: 'root'
})
export class PlayerService{
  playerChoice: ITube | null = null;
  playerMoves: number = 0;

  public clear(){
    this.playerChoice = null;
  }

  public addMove(){
    this.playerMoves++;
  }


}
