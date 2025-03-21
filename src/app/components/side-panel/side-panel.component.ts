import { PlayerService } from './../../player.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_NOOFEMPTYTUBES, DEFAULT_NOOFTUBES, DEFAULT_SWAPS } from '../../constants/default';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-side-panel',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  gameForm: FormGroup;
  @Input() isWin: boolean = false;
  @Output() resetClickEvent: EventEmitter<{noOfTubes: number, noOfEmptyTubes: number, swaps: number}> = new EventEmitter<{noOfTubes: number, noOfEmptyTubes: number, swaps: number}>();

  playerService = inject(PlayerService);

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      noOfTubes: [
        DEFAULT_NOOFTUBES,
        [Validators.required, Validators.min(2), Validators.max(16)]
      ],
      noOfEmptyTubes: [
        DEFAULT_NOOFEMPTYTUBES,
        [Validators.required, Validators.min(1), Validators.max(2)]
      ],
      swaps: [
        DEFAULT_SWAPS,
        [Validators.required, Validators.min(1), Validators.max(1000)]
      ]
    });
  }

  hasError(controlName: string) {
    const control = this.gameForm.controls[controlName];
    return control.invalid && control.touched;
  }


  onSubmit(){
    this.resetClickEvent.emit(this.gameForm.value)
  }
}
