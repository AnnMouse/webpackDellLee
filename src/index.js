import _ from 'lodash';
import $ from 'jquery';

const dom=$('<div>');
dom.html(_.join(['dell','lee']), '-');
$('body').append(dom);