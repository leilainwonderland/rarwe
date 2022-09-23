import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { capitalize } from 'rarwe/helpers/capitalize';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @tracked sortBy = 'title';
  @tracked searchTerm = '';

  @service catalog;
  get hasNoTitle() {
    return !this.title;
  }

  get matchingSongs() {
    const searchTerm = this.searchTerm.toLowerCase();
    return this.model.songs.filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }

  get sortedSongs() {
    let sortBy = this.sortBy;
    let isDecendingSort = false;

    if (sortBy.charAt(0) === '-') {
      sortBy = this.sortBy.slice(1);
      isDecendingSort = true;
    }

    return this.matchingSongs.sort((song1, song2) => {
      if (song1[sortBy] < song2[sortBy]) {
        return isDecendingSort ? 1 : -1;
      }
      if (song1[sortBy] > song2[sortBy]) {
        return isDecendingSort ? -1 : 1;
      }
      return 0;
    });
  }

  get newSongPlaceholder() {
    const bandName = this.model.name;
    return `New ${capitalize([bandName])} song`;
  }

  // @actions are available to be triggered by user action in the template
  @action
  async updateRating(song, rating) {
    song.rating = rating;
    this.catalog.update('song', song, { rating });
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  async saveSong() {
    const song = await this.catalog.create(
      'song',
      { title: this.title },
      { band: { data: { id: this.model.id, type: 'bands' } } }
    );
    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  }

  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
