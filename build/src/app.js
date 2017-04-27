'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _kcors = require('kcors');

var _kcors2 = _interopRequireDefault(_kcors);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import koaBodyParser from 'koa-bodyparser';
// koaApp.use(koaBodyParser());
const PORT = process.env.PORT || 1234;

const koaApp = new _koa2.default();
const router = new _koaRouter2.default();

const SIERRA_AT_TAHOE_COORDS = {
  lat: 38.795716,
  lng: -120.0796698
};

const SQUAW_ALPINE_COORDS = {
  lat: 39.1909452,
  lng: -120.248888
};

const db = {
  resorts: [{
    id: '81e32949-79e7-43ff-a677-38c1c27c1fe6',
    name: 'Squaw Valley',
    logo: '/images/resorts/squaw.svg',
    location: 'Olympic Valley, CA 96146',
    status: 'Open',
    coords: SQUAW_ALPINE_COORDS,
    weather: {
      condition: 'snow',
      temprature: 28,
      base: 'Powder',
      newSnow: 8,
      snowDepth: 180
    },
    lifts: {
      total: 10,
      open: 5
    },
    trails: {
      total: 23,
      open: 18
    },
    routes: {
      hw50: {
        label: '50',
        status: 'Closed',
        chains: 'R1'
      },
      hw80: {
        label: '80',
        status: 'Open',
        chains: 'R2'
      },
      hw88: {
        label: '88',
        status: 'Closed',
        chains: 'R1'
      }
    }
  }, {
    id: '81e32949-79e7-43ff-a678-38c1c27c1fe6',
    name: 'Sierra-at-Tahoe',
    logo: '/images/resorts/sierra.svg',
    location: 'Twin Bridges, CA 96146',
    status: 'Closed',
    coords: SIERRA_AT_TAHOE_COORDS,
    weather: {
      condition: 'thunderstorm',
      temprature: 40,
      base: 'Slush',
      newSnow: 12,
      snowDepth: 130
    },
    lifts: {
      total: 8,
      open: 5
    },
    trails: {
      total: 40,
      open: 16
    },
    routes: {
      hw50: {
        label: '50',
        status: 'Open'
      },
      hw80: {
        label: '80',
        status: 'Closed'
      },
      hw88: {
        label: '88',
        status: 'Closed'
      }
    }
  }]
};

const getResorts = () => {
  const promise = new Promise((resolve, reject) => {
    // go fetch info from database
    // when you come back,
    // either resolve or reject
    const body = {
      resorts: db.resorts
    };

    setTimeout(() => resolve(body), 0);
  });

  return promise;
};

router.get('/resorts', async ctx => {
  const promise = getResorts();
  const resorts = await promise;
  ctx.body = resorts;
});

koaApp.use((0, _kcors2.default)());
koaApp.use(router.routes());

koaApp.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});