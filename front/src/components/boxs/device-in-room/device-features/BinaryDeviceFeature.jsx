import { getDeviceName } from '../../../../utils/device';

const BinaryDeviceType = ({ children, ...props }) => {
  function updateValue() {
    props.updateValue(
      props.x,
      props.y,
      props.device,
      props.deviceFeature,
      props.deviceIndex,
      props.deviceFeatureIndex,
      props.deviceFeature.last_value === 0 ? 1 : 0
    );
  }

  return (
    <tr>
      <td>
        <i class="fe fe-toggle-right" />
      </td>
      <td>{getDeviceName(props.device, props.deviceFeature)}</td>
      <td class="text-right">
        <label class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            value="1"
            checked={props.deviceFeature.last_value}
            onClick={updateValue}
          />
        </label>
      </td>
    </tr>
  );
};

export default BinaryDeviceType;
