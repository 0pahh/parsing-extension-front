import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="loader"></span>`,
  styles: [
    `
      $color1: #f4f1de;
      $color2: #e07a5f;
      $color3: #3d405b;
      $color4: #81b29a;
      $color5: #f2cc8f;
      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid #fff;
        border-bottom-color: $color3;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {}
