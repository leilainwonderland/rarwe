import Controller from '@ember/controller';
import { action } from '@ember/object';
import Song from 'rarwe/models/song';
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

  @action async upDateRating( song, rating ) {
    song.rating = rating;
    let payload = {
      data: {
        id: song.id,
        type:'songs',
        attributes: {
          rating
        },
      },
    };
    await fetch (`/songs/${song.id}`, {
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
  async saveSong () {
    let payload = {
      data: {
        type: 'songs',
        attributes: { title: this.title },
        relationships: {
          band: {
            data: {
              id: this.model.id,
              type: 'bands'
            },
          },
        },
      },
    };
    let response = await fetch('/songs', {
      method:'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(payload)
    });
    let json = await response.json();
    let { id, attributes, relationships } = json.data;
    let rels = {};
    for (let relationshipsName in relationships) {
      rels[relationshipsName].links.related;
    };
    let song = new Song ({ id, ...attributes }, rels);s
    this.catalog.add('song', song);
    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  };

  @action cancel() {
    this.title = '';
    this.showAddSong = true;
  };
};
