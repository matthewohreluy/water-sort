import { Injectable, inject } from "@angular/core";
import { ITube } from "./tube.interface";
import { COLOR_CONTENT, DEFAULT_DIFFICULTY, DEFAULT_NOOFEMPTYTUBES, DEFAULT_NOOFTUBES, DEFAULT_SWAPS } from "../../constants/default";
import { MathService } from "../../math.service";
import { IGameForm } from "../side-panel/side-panel.interface";

@Injectable({
  providedIn: 'root'
})
export class TubeService{
  // tubes
  tubeData: ITube[] = [];

  moveStack: [ITube,ITube][]= [];

  // CONFIGS
  noOfTubes: number = DEFAULT_NOOFTUBES;
  noOfEmptyTubes: number = DEFAULT_NOOFEMPTYTUBES;
  swaps: number = DEFAULT_SWAPS;
  isHardSwap: boolean = DEFAULT_DIFFICULTY;

  mathService = inject(MathService);

  public addMoveToStack(tube1: ITube, tube2: ITube){
    if(this.tubeIsEmpty(tube1) || this.tubeIsFull(tube2) || this.isSameTube(tube1,tube2) || !this.isFit(tube1,tube2) || !this.checkTubeHaveSameColor(tube1,tube2)) return;
    this.moveStack.push([tube1, tube2]);
  }

  public undo(){
    // get value from moveStack
    if(this.moveStack.length === 0) return;
    const lastItem: [ITube,ITube] = JSON.parse(JSON.stringify(this.moveStack.pop()));
    lastItem[0].isActive = false;
    lastItem[1].isActive = false;


    // update tubeData
    let index0 = this.tubeData.findIndex(tube=>tube.id === lastItem[0].id);
    let index1 = this.tubeData.findIndex(tube=>tube.id === lastItem[1].id);
    this.tubeData[index0] = lastItem[0];
    this.tubeData[index1] = lastItem[1];
  }

  public generateTubes(){
    this.tubeData = Array.from({length: this.noOfTubes + this.noOfEmptyTubes}, (_, i)=>({
      id: i + 1,
      contents: this.noOfTubes > i ? [i+1,i+1,i+1,i+1] : [0,0,0,0],
      isActive: false
    }))
  }

  public randomizeTubeData(){
    for(let x = 0; x<this.swaps; x++){
      let index1 = this.mathService.randomize(0,3);
      let index2 = this.mathService.randomize(0,3);
      if(!this.isHardSwap) index1 = index2
      this.swap(
        this.tubeData[this.mathService.randomize(0,this.noOfTubes-1)],
        this.tubeData[this.mathService.randomize(0,this.noOfTubes-1)],
        index1,index2)
     }
  }

  public resetValues(formData: IGameForm){
    this.tubeData = [];
    this.noOfTubes = formData.noOfTubes;
    this.noOfEmptyTubes = formData.noOfEmptyTubes;
    this.swaps = formData.swaps;
    this.isHardSwap =formData.gameMode;
  }

  fill(tube1: ITube, tube2: ITube){
  if(this.tubeIsEmpty(tube1) || this.tubeIsFull(tube2) || this.isSameTube(tube1,tube2) || !this.isFit(tube1,tube2) || !this.checkTubeHaveSameColor(tube1,tube2)) return;

   const liquid = this.liquidToFill(tube1);
   this.removeLiquid(tube1);
   this.addLiquid(tube2, liquid);
  }

  checkPlayerWin(tubes: ITube[]): boolean{
    return this.checkWin(tubes);
  }

  swap(tube1: ITube, tube2: ITube, index1: 0|1|2|3, index2: 0|1|2|3){
    let temp = JSON.parse(JSON.stringify(tube1.contents[index1]));
    tube1.contents[index1] = JSON.parse(JSON.stringify(tube2.contents[index2]));
    tube2.contents[index2] = temp;
  }

  private checkWin(tubes: ITube[]): boolean{
    for(let i = 0; i<tubes.length;i++){
      if(!tubes[i].contents.every(liquid=>liquid === tubes[i].contents[0])){
        return false;
      }
    }
    return true;
  }

  private removeLiquid(tube: ITube): {type: COLOR_CONTENT, length: number}{
    const index = tube.contents.findIndex(num => num !== 0);
    const type = tube.contents[index];
    let count = 0;
    for(let i = index; i<tube.contents.length;i++){
      if(tube.contents[i] == type){
        tube.contents[i] = COLOR_CONTENT.COLOR0;
        count++;
      }else{
        break;
      }
    }
    return {type: type, length: count}
  }

  private addLiquid(tube: ITube, liquid: {type: number, length: number}): void{
    if(this.tubeIsFull(tube)) return;
    let index = 0;
    for (let i = tube.contents.length - 1; i >= 0; i--) {
      if (tube.contents[i] === 0) {
        index = i;
        break; // Stops immediately
      }
    }

    for(let j = index; j >= 0; j--){
      if(liquid.length > 0){
        tube.contents[j] = liquid.type;
        liquid.length--;
      }

    }

  }

  private tubeIsEmpty(tube: ITube): boolean{
    return tube.contents.findIndex(num => num !== 0) == -1;
  }

  private tubeIsFull(tube: ITube): boolean{
    return tube.contents.findIndex(num => num === 0) == -1;
  }

  private isSameTube(tube1: ITube, tube2: ITube): boolean{
    return tube1.id === tube2.id;
  }

  private isFit(tube1: ITube, tube2: ITube): boolean{
    if(this.liquidToFill(tube1).length <= this.tubeSpace(tube2)) return true;
    return false;
  }

  private liquidToFill(tube: ITube): {type: number, length: number}{

    let index = tube.contents.findIndex(num=>  num !== 0);
    let type = tube.contents[index];
    let count = 0;
    for(let i = index; i<4;i++){
      if(tube.contents[i] === type){
        count++;
      }else{
        break;
      }
    }
    return {type: type, length: count};
  }

  private tubeSpace(tube: ITube): number{
    if(this.tubeIsFull(tube)) return 0;

    let index = tube.contents.findIndex(num=>  num === 0);
    let count = 0;
    for(let i = index; i<4;i++){
      if(tube.contents[i] === COLOR_CONTENT.COLOR0){
        count++;
      }
    }
    return count;
  }

  private checkTubeHaveSameColor(tube1: ITube, tube2: ITube): boolean{
    if((this.tubeIsEmpty(tube1) && this.tubeIsEmpty(tube2))) return false;

    let tube1FirstLiquidColor = tube1.contents.find(num=>num!==0) ? tube1.contents.find(num=>num!==0) : 0;
    let tube2FirstLiquidColor = tube2.contents.find(num=>num!==0) ? tube2.contents.find(num=>num!==0) : 0;

    if(tube1FirstLiquidColor === tube2FirstLiquidColor || (tube1FirstLiquidColor == 0 && tube2FirstLiquidColor !== 0) ||  (tube1FirstLiquidColor != 0 && tube2FirstLiquidColor === 0)) return true;

    return false;
  }
}
