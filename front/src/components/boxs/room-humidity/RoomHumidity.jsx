import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Text } from 'preact-i18n';
import get from 'get-value';

import actions from '../../../actions/dashboard/boxes/humidityInRoom';
import { DASHBOARD_BOX_STATUS_KEY, DASHBOARD_BOX_DATA_KEY } from '../../../utils/consts';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../server/utils/constants';

const isNotNullOrUndefined = value => value !== undefined && value !== null;

const RoomHumidityBox = ({ children, ...props }) => (
  <div class="card card-sm">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-auto">
          {props.humidity > 45 && props.humidity < 60 && (
            <span class="bg-green text-white avatar">
              <i class="fe fe-droplet" />
            </span>
          )}
          {props.humidity <= 45 && (
            <span class="bg-yellow text-white avatar">
              <i class="fe fe-droplet" />
            </span>
          )}
          {props.humidity >= 60 && (
            <span class="bg-blue text-white avatar">
              <i class="fe fe-droplet" />
            </span>
          )}
        </div>
        <div class="col">
          <div class="font-weight-medium">
            {isNotNullOrUndefined(props.humidity) && (
              <h4 class="m-0">
                <Text id="global.percentValue" fields={{ value: Math.round(props.humidity) }} />
              </h4>
            )}
            {!isNotNullOrUndefined(props.humidity) && (
              <p class="m-0">
                <Text id="dashboard.boxes.humidityInRoom.noHumidityRecorded" />
              </p>
            )}
          </div>
          <div class="text-muted">{props.roomName}</div>
        </div>
        <div class="col-auto"></div>
      </div>
    </div>
  </div>
);

class RoomHumidityBoxComponent extends Component {
  refreshData = () => {
    this.props.getHumidityInRoom(this.props.box, this.props.x, this.props.y);
  };

  updateRoomHumidity = payload => {
    this.props.deviceFeatureWebsocketEvent(this.props.box, this.props.x, this.props.y, payload);
  };

  componentDidMount() {
    this.refreshData();
    this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE, this.updateRoomHumidity);
  }

  componentDidUpdate(previousProps) {
    const roomChanged = get(previousProps, 'box.room') !== get(this.props, 'box.room');
    if (roomChanged) {
      this.refreshData();
    }
  }

  componentWillUnmount() {
    this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE, this.updateRoomHumidity);
  }

  render(props, {}) {
    const boxData = get(props, `${DASHBOARD_BOX_DATA_KEY}HumidityInRoom.${props.x}_${props.y}`);
    const boxStatus = get(props, `${DASHBOARD_BOX_STATUS_KEY}HumidityInRoom.${props.x}_${props.y}`);
    const humidity = get(boxData, 'room.humidity.humidity');
    const unit = get(boxData, 'room.humidity.unit');
    const roomName = get(boxData, 'room.name');
    return <RoomHumidityBox {...props} humidity={humidity} unit={unit} boxStatus={boxStatus} roomName={roomName} />;
  }
}

export default connect(
  'session,DashboardBoxDataHumidityInRoom,DashboardBoxStatusHumidityInRoom',
  actions
)(RoomHumidityBoxComponent);
