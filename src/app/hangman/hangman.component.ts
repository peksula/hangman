import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../episode.service';
import { Episode } from '../models/episode';


@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
 
  episodes: Episode[] = [];

  constructor(private episodeService: EpisodeService) {
  }

  ngOnInit(): void {
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes().subscribe(
      episodes => this.episodes = episodes);
  }
}
