import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictadoComponent } from './dictado.component';

describe('DictadoComponent', () => {
  let component: DictadoComponent;
  let fixture: ComponentFixture<DictadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DictadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
