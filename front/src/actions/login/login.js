import { LoginStatus, RequestStatus } from '../../utils/consts';
import { validateEmail } from '../../utils/validator';
import createActionsProfilePicture from '../profilePicture';
import { route } from 'preact-router';

function createActions(store) {
  const actionsProfilePicture = createActionsProfilePicture(store);

  const actions = {
    async login(state, e) {
      if (e) {
        e.preventDefault();
      }
      if (!validateEmail(state.loginFormEmailValue)) {
        return store.setState({
          loginStatus: LoginStatus.WrongEmailError
        });
      }
      store.setState({
        loginStatus: LoginStatus.Processing
      });
      try {
        // Login
        const userFromLogin = await state.httpClient.post('/api/v1/login', {
          email: state.loginFormEmailValue,
          password: state.loginFormPasswordValue
        });
        state.session.saveUser(userFromLogin);
        state.session.init();
        // Get full user from backend
        const user = await state.httpClient.get('/api/v1/me');
        store.setState({
          user,
          loginStatus: LoginStatus.LoginSuccess,
          loginFormEmailValue: '',
          loginFormPasswordValue: ''
        });
        actionsProfilePicture.loadProfilePicture(state);
        // redirect to dashboard
        route('/dashboard');
      } catch (e) {
        store.setState({
          loginStatus: LoginStatus.WrongCredentialsError
        });
      }
    },
    onEmailChange(state, event) {
      store.setState({
        loginFormEmailValue: event.target.value
      });
    },
    onPasswordChange(state, event) {
      store.setState({
        loginFormPasswordValue: event.target.value
      });
    },
    async checkIfInstanceIsConfigured(state) {
      // check instance state
      store.setState({
        checkIfInstanceIsConfiguredRequestState: RequestStatus.Getting
      });
      try {
        const instanceState = await state.httpClient.get('/api/v1/setup');
        if (!instanceState.account_configured) {
          route('/signup');
        }
        store.setState({
          checkIfInstanceIsConfiguredRequestState: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          checkIfInstanceIsConfiguredRequestState: RequestStatus.Error
        });
      }
    }
  };

  return actions;
}

export default createActions;
