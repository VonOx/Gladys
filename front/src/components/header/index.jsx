import { Text, Localizer } from 'preact-i18n';
import cx from 'classnames';
import { Link } from 'preact-router/match';
import { isUrlInArray } from '../../utils/url';
import { USER_ROLE } from '../../../../server/utils/constants';

const PAGES_WITHOUT_HEADER = [
  '/login',
  '/signup',
  '/signup/create-account-local',
  '/signup/create-account-gladys-gateway',
  '/signup/preference',
  '/signup/configure-house',
  '/signup/success',
  '/forgot-password',
  '/reset-password',
  '/link-gateway-user',
  '/signup-gateway',
  '/subscribe-gateway',
  '/gateway-configure-two-factor',
  '/confirm-email',
  '/dashboard/integration/device/google-home/authorize',
  '/dashboard/integration/device/alexa/authorize'
];

const Header = ({ ...props }) => {
  if (isUrlInArray(props.currentUrl, PAGES_WITHOUT_HEADER)) {
    return null;
  }
  if (props.fullScreen) {
    return null;
  }
  return (
    <>
      <header class="navbar navbar-expand-md navbar-light d-print-none">
        <div class="container-xl">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a class="header-brand" href="/dashboard">
              <Localizer>
                <img
                  src="/assets/icons/favicon-96x96.png"
                  class="navbar-brand-image"
                  height="32"
                  alt={<Text id="global.logoAlt" />}
                />
              </Localizer>
              <span id="header-title">
                <Text id="header.gladysAssistant" />
              </span>
            </a>
          </h1>
          <div class="navbar-nav flex-row order-md-last">
            <div class="d-none d-md-flex">
              <a
                href="?theme=dark"
                class="nav-link px-0 hide-theme-dark"
                title="Enable dark mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                </svg>
              </a>
              <a
                href="?theme=light"
                class="nav-link px-0 hide-theme-light"
                title="Enable light mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
              </a>
            </div>
            <div class={cx('nav-item', 'dropdown', { show: props.showDropDown })}>
              <a onClick={props.toggleDropDown} class="nav-link d-flex lh-1 text-reset p-0" data-toggle="dropdown">
                <span class="avatar avatar-sm" style={`background-image: url(${props.profilePicture})`}></span>
                <div class="d-none d-xl-block ps-2">
                  <div>{props.user.firstname}</div>
                  <div class="mt-1 small text-muted">
                    {props.user.role === USER_ROLE.ADMIN && <Text id="profile.adminRole" />}
                    {props.user.role !== USER_ROLE.ADMIN && <Text id="profile.userRole" />}
                  </div>
                </div>
              </a>
              <div
                class={cx('dropdown-menu', 'dropdown-menu-right', 'dropdown-menu-arrow', {
                  show: props.showDropDown
                })}
              >
                <a class="dropdown-item" href="/dashboard/profile">
                  <i class="dropdown-icon fe fe-user" /> <Text id="header.profile" />
                </a>
                {props.user.role === USER_ROLE.ADMIN && (
                  <a class="dropdown-item" href="/dashboard/settings/house">
                    <i class="dropdown-icon fe fe-settings" /> <Text id="header.settings" />
                  </a>
                )}
                <div class="dropdown-divider" />
                <a
                  class="dropdown-item"
                  href="https://community.gladysassistant.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="dropdown-icon fe fe-help-circle" /> <Text id="header.needHelp" />
                </a>
                <a class="dropdown-item" href="" onClick={props.logout}>
                  <i class="dropdown-icon fe fe-log-out" /> <Text id="header.signOut" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="navbar navbar-light">
            <div class="container-xl">
              <ul class="navbar-nav">
                <li class={cx('nav-item', { active: props.currentUrl === '/dashboard' })}>
                  <Link href="/dashboard" class="nav-link">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      <i class="fe fe-home" />
                    </span>
                    <Text class="nav-link-title" id="header.home" />
                  </Link>
                </li>
                <li class={cx('nav-item', { active: props.currentUrl === '/dashboard/chat' })}>
                  <Link href="/dashboard/chat" class="nav-link">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      <i class="fe fe-message-square" />
                    </span>
                    <Text class="nav-link-title" id="header.chat" />
                  </Link>
                </li>
                <li class={cx('nav-item', { active: props.currentUrl === '/dashboard/integration' })}>
                  <Link href="/dashboard/integration" class="nav-link">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      <i class="fe fe-grid" />
                    </span>{' '}
                    <Text id="header.integrations" />
                  </Link>
                </li>
                <li class={cx('nav-item', { active: props.currentUrl === '/dashboard/calendar' })}>
                  <Link href="/dashboard/calendar" class="nav-link">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      {' '}
                      <i class="fe fe-calendar" />
                    </span>{' '}
                    <Text id="header.calendar" />
                  </Link>
                </li>
                <li class={cx('nav-item', { active: props.currentUrl === '/dashboard/maps' })}>
                  <Link activeClassName="active" href="/dashboard/maps" class="nav-link">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      <i class="fe fe-map" />{' '}
                    </span>
                    <Text id="header.maps" />
                  </Link>
                </li>
                {props.user.role === USER_ROLE.ADMIN && (
                  <li class={cx('nav-item', { active: props.currentUr === '/dashboard/scene' })}>
                    <Link href="/dashboard/scene" class="nav-link">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <i class="fe fe-play" />
                      </span>
                      <Text id="header.scenes" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
