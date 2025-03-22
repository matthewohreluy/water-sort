import { PlayerService } from './../../player.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_DIFFICULTY, DEFAULT_NOOFEMPTYTUBES, DEFAULT_NOOFTUBES, DEFAULT_SWAPS } from '../../constants/default';
import { NgIf } from '@angular/common';
import { IGameForm } from './side-panel.interface';

@Component({
  selector: 'app-side-panel',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  gameForm: FormGroup;
  @Input() isWin: boolean = false;
  @Output() resetClickEvent: EventEmitter<IGameForm> = new EventEmitter<IGameForm>();
  @Output() undoClickEvent: EventEmitter<string> = new EventEmitter<string>();

  playerService = inject(PlayerService);

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      noOfTubes: [
        DEFAULT_NOOFTUBES,
        [Validators.required, Validators.min(2), Validators.max(16)]
      ],
      noOfEmptyTubes: [
        DEFAULT_NOOFEMPTYTUBES,
        [Validators.required, Validators.min(1), Validators.max(3)]
      ],
      swaps: [
        DEFAULT_SWAPS,
        [Validators.required, Validators.min(1), Validators.max(100)]
      ],
      gameMode: [DEFAULT_DIFFICULTY]
    });
  }

  hasError(controlName: string) {
    const control = this.gameForm.controls[controlName];
    return control.invalid && control.touched;
  }


  onSubmit(){
    this.resetClickEvent.emit(this.gameForm.value)
  }

  undo(){
    this.undoClickEvent.emit('')
  }
}
