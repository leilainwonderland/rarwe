import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import { Band } from 'rarwe/routes/bands';

export default class BandsNewController extends Controller {
  @tracked name;

  get hashNoName() {
    return !this.name;
  };

  @action 
  updateName (e) {
    this.name = e.target.value;
  };

  @action
  saveBand() {
    new Band({ name: this.name, id: dasherize(this.name) });
  };
};
