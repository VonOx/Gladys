import createActionsProfilePicture from './profilePicture';
import { getDefaultState } from '../utils/getDefaultState';
import { route } from 'preact-router';
import get from 'get-value';
import { isUrlInArray } from '../utils/url';

const OPEN_PAGES = [
  '/signup',
  '/signup/create-account-gladys-gateway',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/gateway-configure-two-factor',
  '/signup-gateway',
  '/subscribe-gateway',
  '/confirm-email'
];

function createActions(store) {
  const actionsProfilePicture = createActionsProfilePicture(store);

  // Setting items
  const items = {
    theme: { localStorage: 'tablerTheme', default: 'light' },
    'menu-position': { localStorage: 'tablerMenuPosition', default: 'top' },
    'menu-behavior': { localStorage: 'tablerMenuBehavior', default: 'sticky' },
    'container-layout': { localStorage: 'tablerContainerLayout', default: 'boxed' }
  };

  // Theme config
  const config = {};
  for (const [key, params] of Object.entries(items)) {
    config[key] = localStorage.getItem(params.localStorage)
      ? localStorage.getItem(params.localStorage)
      : params.default;
  }

  // Parse url params
  const parseUrl = () => {
    const search = window.location.search.substring(1);
    const params = search.split('&');

    for (let i = 0; i < params.length; i++) {
      const arr = params[i].split('=');
      const key = arr[0];
      const value = arr[1];

      if (!!items[key]) {
        // Save to localStorage
        localStorage.setItem(items[key].localStorage, value);

        // Update local variables
        config[key] = value;
      }
    }
  };

  // Toggle form controls
  const toggleFormControls = form => {
    for (const [key, params] of Object.entries(items)) {
      const elem = form.querySelector(`[name="settings-${key}"][value="${config[key]}"]`);

      if (elem) {
        elem.checked = true;
      }
    }
  };

  // Update body classes
  const updateBodyClasses = () => {
    document.body.classList.remove('theme-dark');
    document.body.classList.remove('theme-light');

    document.body.classList.add(`theme-${config.theme}`);

    // for (const [key, params] of Object.entries(items)) {
    // 	document.body.setAttribute(`data-${key}`, config[key]);
    // }
  };

  // Submit form
  const submitForm = form => {
    // Save data to localStorage
    for (const [key, params] of Object.entries(items)) {
      // Save to localStorage
      const value = form.querySelector(`[name="settings-${key}"]:checked`).value;
      localStorage.setItem(params.localStorage, value);

      // Update local variables
      config[key] = value;
    }

    // Update body classes
    updateBodyClasses();

    window.dispatchEvent(new Event('resize'));

    new bootstrap.Offcanvas(form).hide();
  };

  // Parse url
  parseUrl();

  // Update body classes
  updateBodyClasses();

  // Elements
  const form = document.querySelector('#offcanvasSettings');

  // Toggle form controls
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      submitForm(form);
    });

    toggleFormControls(form);
  }

  const actions = {
    handleRoute(state, e) {
      store.setState({
        currentUrl: e.url,
        showDropDown: false,
        showCollapsedMenu: false
      });
    },
    toggleDropDown(state) {
      store.setState({
        showDropDown: !state.showDropDown
      });
    },
    toggleCollapsedMenu(state) {
      store.setState({
        showCollapsedMenu: !state.showCollapsedMenu
      });
    },
    redirectToLogin() {
      const returnUrl = window.location.pathname + window.location.search;
      route(`/login?return_url=${encodeURIComponent(returnUrl)}`);
    },
    async checkSession(state) {
      if (isUrlInArray(state.currentUrl, OPEN_PAGES)) {
        return null;
      }
      try {
        await state.session.init();
        if (!state.session.isConnected()) {
          actions.redirectToLogin();
        }
        const tasks = [state.httpClient.get('/api/v1/me'), actionsProfilePicture.loadProfilePicture(state)];
        const [user] = await Promise.all(tasks);
        store.setState({
          user
        });
        if (state.session.getGatewayUser) {
          const gatewayUser = await state.session.getGatewayUser();
          const now = new Date();
          if (new Date(gatewayUser.current_period_end) < now) {
            store.setState({
              gatewayAccountExpired: true
            });
          }
        }
      } catch (e) {
        const status = get(e, 'response.status');
        const error = get(e, 'response.data.error');
        const gatewayErrorMessage = get(e, 'response.data.error_message');
        const errorMessageOtherFormat = get(e, 'response.data.message');
        if (status === 401) {
          state.session.reset();
          actions.redirectToLogin();
        } else if (error === 'GATEWAY_USER_NOT_LINKED') {
          route('/link-gateway-user');
        } else if (error === 'USER_NOT_ACCEPTED_LOCALLY') {
          route('/link-gateway-user');
        } else if (gatewayErrorMessage === 'NO_INSTANCE_FOUND' || errorMessageOtherFormat === 'NO_INSTANCE_DETECTED') {
          route('/link-gateway-user');
        } else {
          console.error(e);
        }
      }
    },
    async logout(state, e) {
      e.preventDefault();
      const user = state.session.getUser();
      if (user && user.session_id) {
        await state.httpClient.post(`/api/v1/session/${user.session_id}/revoke`);
      }
      state.session.reset();
      route('/login', true);
      const defaultState = getDefaultState();
      store.setState(defaultState, true);
    }
  };

  return Object.assign(actions, actionsProfilePicture);
}

export default createActions;
