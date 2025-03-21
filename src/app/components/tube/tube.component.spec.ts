import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeComponent } from './tube.component';

describe('TubeComponent', () => {
  let component: TubeComponent;
  let fixture: ComponentFixture<TubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
