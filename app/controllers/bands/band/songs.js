import Controller from '@ember/controller';
import { action } from '@ember/object';
import Song from 'rarwe/models/song';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BandsBandSongsController extends Controller {
    @tracked showAddSong = true;
    @tracked title = '';

  get hashNoTitle() {
    return !this.title;
  }

  @service catalog;

  @action
  updateTitle(e) {
    this.title = e.target.value;
  }

  @action saveSong() {
    let song = new Song({ title: this.title, band: this.model });
    this.catalog.add('song', song);
    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  }

  @action cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
