import Route from '@ember/routing/route';

export default class BandsBandSongsRoute extends Route {
  model() {
    let band = this.modelFor('bands.band');
    console.log(band);
    return band.songs;
  }
}
