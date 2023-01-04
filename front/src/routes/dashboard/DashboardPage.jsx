import { Text } from 'preact-i18n';
import { Link } from 'preact-router/match';
import cx from 'classnames';
import BoxColumns from './BoxColumns';
import EditBoxColumns from './EditBoxColumns';
import EmptyState from './EmptyState';
import EditActions from './EditActions';

import style from './style.css';

const marginBottom = {
  marginBottom: '10rem'
};

const DashboardPage = ({ children, ...props }) => (
  <div class="page-wrapper">
    <div class={props.loading ? 'dimmer active' : 'dimmer'}>
      <div class="loader" />
      <div class="dimmer-content">
        <div style={props.dashboardEditMode ? marginBottom : {}}>
          {!props.dashboardEditMode && (
            <div class="page-header" style="margin-bottom:1rem">
              <div class="container-xl">
                <div class="row g-2 align-items-center">
                  <div class="col">
                    <div class="page-title">
                      {!props.dashboardListEmpty && (
                        <div class="dropdown">
                          <button class="btn dropdown-toggle" onClick={props.toggleDashboardDropdown}>
                            {props.currentDashboard && props.currentDashboard.name}
                          </button>
                          <div
                            class={cx('dropdown-menu', {
                              show: props.dashboardDropdownOpened
                            })}
                          >
                            {props.dashboards.map(dashboard => (
                              <Link
                                class="dropdown-item"
                                href={`/dashboard/${dashboard.selector}`}
                                onClick={props.redirectToDashboard}
                              >
                                {dashboard.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                      {!props.dashboardNotConfigured && props.browserFullScreenCompatible && (
                        <button onClick={props.toggleFullScreen} class={cx('btn btn-outline-secondary btn-sm')}>
                          <span>
                            {!props.fullScreen && <Text id="dashboard.enableFullScreen" />}
                            {props.fullScreen && <Text id="dashboard.disableFullScreen" />}{' '}
                            {!props.fullScreen && <i class="fe fe-maximize-2" />}
                            {props.fullScreen && <i class="fe fe-minimize-2" />}
                          </span>
                        </button>
                      )}
                      {props.currentDashboard && (
                        <button
                          onClick={props.editDashboard}
                          class={cx('btn btn-outline-primary btn-sm', style.smallButtonOnBigScreen)}
                        >
                          <span>
                            <Text id="dashboard.editDashboardButton" /> <i class="fe fe-edit" />
                          </span>
                        </button>
                      )}
                      <Link
                        href="/dashboard/create/new"
                        class={cx('btn btn-outline-success btn-sm', style.smallButtonOnBigScreen)}
                      >
                        <span>
                          <Text id="dashboard.newDashboardButton" /> <i class="fe fe-plus" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {props.gatewayInstanceNotFound && (
            <div class="alert alert-warning">
              <Text id="dashboard.gatewayInstanceNotFoundError" />
            </div>
          )}
          {props.dashboardNotConfigured && !props.dashboardEditMode && (
            <EmptyState dashboardListEmpty={props.dashboardListEmpty} />
          )}
          {!props.dashboardNotConfigured && !props.dashboardEditMode && (
            <BoxColumns homeDashboard={props.currentDashboard} />
          )}
          {props.dashboardEditMode && (
            <EditBoxColumns
              updateCurrentDashboardName={props.updateCurrentDashboardName}
              editDashboardDragEnable={props.editDashboardDragEnable}
              moveCard={props.moveCard}
              moveBoxUp={props.moveBoxUp}
              moveBoxDown={props.moveBoxDown}
              addBox={props.addBox}
              homeDashboard={props.currentDashboard}
              updateNewSelectedBox={props.updateNewSelectedBox}
              removeBox={props.removeBox}
              updateBoxConfig={props.updateBoxConfig}
            />
          )}
          {props.dashboardEditMode && <EditActions {...props} />}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
