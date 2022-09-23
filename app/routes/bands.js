import Route from '@ember/routing/route';
import { service } from '@ember/service';
import wait from 'rarwe/utils/wait';

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    await wait(100);
    return this.catalog.fetchAll('bands');
  }
}
