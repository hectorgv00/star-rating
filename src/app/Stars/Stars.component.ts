import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IStar } from '../iStar';

@Component({
  selector: 'Stars',
  templateUrl: './Stars.component.html',
  styleUrls: ['./Stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Output() rating: EventEmitter<number> = new EventEmitter<number>();

  @Input() stars: IStar = {
    fontSize: 34,
    stars: 5,
    name: '',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stars']) {
      if (changes['stars'].currentValue) {
        // Añadimos un timeout de una milesima por desfase
        setTimeout(() => {
          // Recogemos el contenedor de las estrellas que coincida con el nombre
          let starsContainer: HTMLElement = this.getStarsContainer();
          // Creamos los inputs de las estrellas
          this.createInputsStars(starsContainer);
          // Recogemos los inputs de las estrellas
          let stars: HTMLElement[] = this.getStarsInptuts();
          // Añadimos el tamaño de las estrellas
          this.setStarsSize(stars);
          // Añadimos el evento click a cada estrella
          this.addEventListenerClick(stars);
          // Si hay una valoracion previa, la mostramos
          if (this.stars.rating) {
            if (this.stars.rating > this.stars.stars) {
              throw new Error(
                'La valoracion no puede ser mayor que el numero de estrellas'
              );
            }
            console.log(stars[this.stars.stars * 2 - this.stars.rating * 2]);
            stars[this.stars.stars * 2 - this.stars.rating * 2].click();
          }
        }, 1);
      }
    }
  }

  ngOnInit() {}

  createInputsStars(starsContainer: HTMLElement) {
    for (let index = 0; index < this.stars.stars * 2; index++) {
      let halfStar = document.createElement(`input`);
      halfStar.setAttribute('type', 'radio');
      halfStar.setAttribute('name', this.stars.name);
      starsContainer?.appendChild(halfStar);
    }
  }

  addEventListenerClick(stars: HTMLElement[]) {
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.rating.emit((this.stars.stars * 2 - index) / 2);
      });
    });
  }

  getStarsContainer(): HTMLElement {
    return document.querySelector(`#${this.stars.name}`)!;
  }

  getStarsInptuts(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll(
        `input[type="radio"][name="${this.stars.name}"]`
      )
    );
  }

  setStarsSize(stars: HTMLElement[]): void {
    stars.forEach((star) => {
      star.style.fontSize = this.stars.fontSize + 'px';
      star.style.left = (Number(this.stars.fontSize) * 4) / 34 + 'px';
      star.style.right = (Number(this.stars.fontSize) * 4) / 34 + 'px';
      star.style.width = (Number(this.stars.fontSize) * 20) / 34 + 'px';
      star.style.height = (Number(this.stars.fontSize) * 40) / 34 + 'px';
    });
  }
}
