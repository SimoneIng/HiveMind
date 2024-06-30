import { Component, Input } from '@angular/core';
import { Idea } from '../../_models/Idea.type';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  @Input({required: true}) idea: Idea; 
}
