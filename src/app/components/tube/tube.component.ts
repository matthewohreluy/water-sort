import { Component,EventEmitter,Input, Output } from '@angular/core';
import { DEFAULT_COLORS, DEFAULT_TUBE } from '../../constants/default';
import { ITube } from './tube.interface';

@Component({
  selector: 'app-tube',
  imports: [],
  templateUrl: './tube.component.html',
  styleUrl: './tube.component.scss'
})
export class TubeComponent {
  @Input() data: ITube = DEFAULT_TUBE;
  @Output() tubeClickEvent: EventEmitter<number> = new EventEmitter<number>();
  colors: string[] = DEFAULT_COLORS;

  onTubeClick(){
    this.data.isActive = true;
    this.tubeClickEvent.emit(this.data.id);
  }
}
