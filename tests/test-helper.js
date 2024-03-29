import Application from 'rarwe/app';
import config from 'rarwe/config/environment';
import QUnit from 'qunit';
// import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
