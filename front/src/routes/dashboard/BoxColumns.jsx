import Box from './Box';
import cx from 'classnames';
import style from './style.css';

const BoxColumns = ({ children, ...props }) => (
  <div class="page-wrapper">
    <div class="bage-body">
      <div class="container-xl">
        <div class="row row-cards">
          {props.homeDashboard &&
            props.homeDashboard.boxes.map((column, x) => (
              <div
                class={cx('col-sm-6 col-lg-4', {
                  [style.removePaddingFirstCol]: x === 0,
                  [style.removePaddingLastCol]: x === 2,
                  [style.removePadding]: true // it will remove padding when in mobile view
                })}
              >
                {column.map((box, y) => (
                  <Box key={`${props.homeDashboard.id}-${x}-${y}`} box={box} x={x} y={y} />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default BoxColumns;
