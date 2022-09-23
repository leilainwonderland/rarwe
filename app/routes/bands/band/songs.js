import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsBandSongsRoute extends Route {
  @service catalog;

  queryParams = {
    sortBy: {
      as: 's',
    },
    searchTrem: {
      as: 'q',
    },
  };

  async model() {
    let band = this.modelFor('bands.band');
    await this.catalog.fetchRelated(band, 'songs');
    return band;
    // return Promise.reject();
  }

  resetController(controller) {
    controller.title = '';
    controller.showAddsong = true;
  }
}
