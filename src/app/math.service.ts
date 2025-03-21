import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class MathService{

  // randomizes from min to max
  randomize(min: number,max: number): 0|1|2|3{
    return Math.floor(Math.random() * (max - min + 1)) + min as 0 | 1 | 2 | 3;
  }

}
