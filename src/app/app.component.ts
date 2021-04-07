import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cubicoWMSFE';
  listEstudiantes:any[]=[
    {nombre:"Jose",estado:"Regular"},
    {nombre:"pepe",estado:"Regular"},
    {nombre:"Pablo",estado:"Promovido"},
    {nombre:"Juancito",estado:"Libre"},
  ];
}
