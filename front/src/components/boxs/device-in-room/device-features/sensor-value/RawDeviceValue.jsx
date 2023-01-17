import { Text } from 'preact-i18n';
import dayjs from 'dayjs';

const RawDeviceValue = ({ deviceFeature, ...props }) => (
  <div>
    {deviceFeature.last_value === null && <Text id="dashboard.boxes.devicesInRoom.noValue" />}
    {deviceFeature.last_value !== null && (
      <span title={dayjs(deviceFeature.last_value_changed).locale(props.user.language)}>
        {`${deviceFeature.last_value} `}
        <Text id={`deviceFeatureUnitShort.${deviceFeature.unit}`} />
      </span>
    )}
  </div>
);

export default RawDeviceValue;
