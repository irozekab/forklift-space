// style libraries
import 'angularjs-toaster/toaster.scss';
// script libraries
import angular from 'angular';
import lodash from 'lodash';
import moment from 'moment';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-formly';
import 'angular-formly-templates-bootstrap';
import 'angular-cookies';
import 'angularjs-toaster';
import 'angular-moment';
import 'ng-file-upload';
import 'angular-animate';
import 'angular-messages';
import 'angular-jwt';
import 'angular-lock';
import 'angular-scroll';
import 'checklist-model';
import 'ng-meta';
// styles
import './style/style.scss';
// modules
import './app/modules/itsyFormly';
// scripts
import variables from './variables';
import config from './config';
import run from './run';
angular.module('app', ['ngSanitize', 'ui.bootstrap', 'ui.router', 'toaster', 'ngCookies', 'angular-jwt', 'angularMoment', 'ngFileUpload', 'itsyFormly', 'ngAnimate', 'ngMessages', 'auth0.lock', 'duScroll', 'checklist-model', 'ngMeta', ]).constant('_', lodash).constant('moment', moment).constant('variables', variables).config(config).run(run);
// services
require('./app/services/app.service');
require('./app/services/mail.service');
require('./app/services/listing.service');
require('./app/services/auth.service');
require('./app/services/profile.service');
require('./app/services/directoryCategory.service');
require('./app/services/business.service');
require('./app/services/photo.service');
require('./app/services/advertising.service');
// components
require('./app/components/advertising');
require('./app/components/breadcrumb');
require('./app/components/businessItem');
require('./app/components/businessItems');
require('./app/components/colorChart');
require('./app/components/dropzone');
require('./app/components/foot');
require('./app/components/item');
require('./app/components/items');
require('./app/components/mail');
require('./app/components/navbar');
require('./app/components/onEnter');
require('./app/components/pagination');
require('./app/components/photos');
require('./app/components/scrollUp');
require('./app/components/searchBar');
require('./app/components/spinner');
// filters
require('./app/filters/capitalize.filter');
require('./app/filters/splitPipe.filter');
// pages
require('./app/listing');
require('./app/acme');
require('./app/directory');
require('./app/profile');