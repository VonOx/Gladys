import get from 'get-value';
import { Text } from 'preact-i18n';
import cx from 'classnames';

import { DeviceFeatureCategoriesIcon } from '../../../../utils/consts';
import { DEVICE_FEATURE_CATEGORIES } from '../../../../../../server/utils/constants';

import style from './style.css';

const isNullOrUndefined = val => val === null || val === undefined;

const SETPOINT_STEP_BY_CATEGORY = {
  [DEVICE_FEATURE_CATEGORIES.AIR_CONDITIONING]: 1,
  [DEVICE_FEATURE_CATEGORIES.SWITCH]: 1,
  [DEVICE_FEATURE_CATEGORIES.ELECTRICAL_VEHICLE_CHARGE]: 1
};

const DEFAULT_VALUE_BY_CATEGORY = {
  [DEVICE_FEATURE_CATEGORIES.AIR_CONDITIONING]: 18,
  [DEVICE_FEATURE_CATEGORIES.THERMOSTAT]: 18,
  [DEVICE_FEATURE_CATEGORIES.ELECTRICAL_VEHICLE_CLIMATE]: 18,
  [DEVICE_FEATURE_CATEGORIES.SWITCH]: 0,
  [DEVICE_FEATURE_CATEGORIES.ELECTRICAL_VEHICLE_CHARGE]: 5
};

const SetpointDeviceFeature = ({ children, ...props }) => {
  const SETPOINT_STEP = SETPOINT_STEP_BY_CATEGORY[props.deviceFeature.category] || 0.5;
  const DEFAULT_VALUE_IN_CASE_EMPTY = DEFAULT_VALUE_BY_CATEGORY[props.deviceFeature.category] || 0;

  function updateValue(value) {
    props.updateValueWithDebounce(props.deviceFeature, value);
  }

  function updateValueEvent(e) {
    updateValue(e.target.value);
  }

  function add() {
    const prevValue = isNullOrUndefined(props.deviceFeature.last_value)
      ? DEFAULT_VALUE_IN_CASE_EMPTY
      : props.deviceFeature.last_value;
    updateValue(prevValue + SETPOINT_STEP);
  }

  function substract() {
    const prevValue = isNullOrUndefined(props.deviceFeature.last_value)
      ? DEFAULT_VALUE_IN_CASE_EMPTY
      : props.deviceFeature.last_value;
    updateValue(prevValue - SETPOINT_STEP);
  }

  return (
    <tr>
      <td>
        <i
          class={`fe fe-${get(
            DeviceFeatureCategoriesIcon,
            `${props.deviceFeature.category}.${props.deviceFeature.type}`,
            { default: 'hash' }
          )}`}
        />
      </td>
      <td>{props.rowName}</td>

      <td class="py-0">
        <div class="d-flex justify-content-end">
          <div class="d-flex">
            <div class={cx('input-group', style.setpointHorizontalControls)}>
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" onClick={substract}>
                  <Text id="dashboard.boxes.devicesInRoom.substractButton" />
                </button>
              </div>
              <input
                type="number"
                value={props.deviceFeature.last_value}
                class={cx('form-control text-center', style.removeNumberArrow)}
                onChange={updateValueEvent}
                step={SETPOINT_STEP}
                min={props.deviceFeature.min}
                max={props.deviceFeature.max}
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick={add}>
                  <Text id="dashboard.boxes.devicesInRoom.addButton" />
                </button>
              </div>
            </div>
            <div class={cx('input-group input-group-sm', style.setpointVerticalControls)}>
              <div class="d-flex flex-column mt-2 mb-2">
                <div class="mb-1">
                  <button class="btn btn-block btn-sm btn-outline-secondary" type="button" onClick={add}>
                    <Text id="dashboard.boxes.devicesInRoom.addButton" />
                  </button>
                </div>
                <div>
                  <input
                    type="number"
                    value={props.deviceFeature.last_value}
                    class={cx('form-control text-center input-sm', style.removeNumberArrow)}
                    onChange={updateValueEvent}
                    step={SETPOINT_STEP}
                    min={props.deviceFeature.min}
                    max={props.deviceFeature.max}
                  />
                </div>
                <div class="mt-1">
                  <button class="btn btn-block btn-sm btn-outline-secondary" type="button" onClick={substract}>
                    <Text id="dashboard.boxes.devicesInRoom.substractButton" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SetpointDeviceFeature;
