import App from '../components/App';
import Home from './Home';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./Discussion').default(store),
          require('./PostList').default(store), // no need to modify store, no reducer
          require('./Post').default(store), // add async reducer
          require('./NotFound').default,
        ]);
      });
    },

    indexRoute: {
      component: Home,
    },
  };

  return root;
}
