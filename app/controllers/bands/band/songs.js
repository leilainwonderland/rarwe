import Controller from '@ember/controller';
import { action } from '@ember/object';
import { Song } from '../../../routes/bands';

export default class BandsBandSongsController extends Controller {
  resetController(controller) {
    controller.showAddSong = true;
    controller.title = '';
  }

  get hashNoTitle() {
    return !this.title;
  }

  @action
  updateTitle(e) {
    this.title = e.target.value;
  }

  @action saveSong() {
    let song = new Song({ title: this.title, band: this.model });
    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  }

  @action cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
