import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch'

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';

  get hashNoTitle() {
    return !this.title;
  }

  @service catalog;

  @action async upDateRating(song, rating) {
    song.rating = rating;
    let payload = {
      data: {
        id: song.id,
        type: 'songs',
        attributes: {
          rating
        },
      },
    };
    await fetch(`/songs/${song.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(payload)
    });
  };

  @action
  updateTitle(e) {
    this.title = e.target.value;
  }

  @action
  async saveSong() {
    let song = await this.catalog.create('song',
      { title: this.title },
      { band: { data: { id: this.model.id, type: 'bands' } } }
    );
    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  };

  @action cancel() {
    this.title = '';
    this.showAddSong = true;
  };
};
