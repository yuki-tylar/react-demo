import { format, isAfter, isBefore, isSameDay, isToday } from 'date-fns';
import { Component } from 'react';
import Calendar, { CalendarTileProperties, OnChangeDateCallback } from 'react-calendar';
import { TimePicker } from './time-picker';

type Props = {
  minTime?: Date;
  maxTime?: Date;
  interval?: { hour?: number; minute?: number; }
  initialValue?: Date | null;
  onChange: (value: Date | null) => void;
}

type State = {
  value?: Date;
  selected: Date;
  isPopupShown: boolean;
}

export class FormItemDateTime extends Component<Props, State> {

  private minDate: Date | null = null;
  private maxDate: Date | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPopupShown: false,
      selected: props.initialValue || new Date(),
      ...props.initialValue && { value: props.initialValue },
    }

    const tm = props.minTime;
    if (tm) {
      this.minDate = new Date(tm.getFullYear(), tm.getMonth(), tm.getDate());
    }

    const tM = props.maxTime;
    if (tM) {
      this.maxDate = new Date(tM.getFullYear(), tM.getMonth(), tM.getDate(), 23, 59, 59);
    }
  }

  private tileDisabled = (({ date, view }: CalendarTileProperties) => {
    let disabled = false;
    if (view === 'month') {
      const isBeforeMin = !!this.minDate && isBefore(date, this.minDate);
      const isAfterMax = !!this.maxDate && isAfter(date, this.maxDate);
      disabled = isBeforeMin || isAfterMax;
    }
    return disabled;
  })

  private onChangeCalendar: OnChangeDateCallback = (value, event) => {
    const t = this.state.selected;
    this.setState({ ...this.state, selected: new Date(value.getFullYear(), value.getMonth(), value.getDate(), t.getHours(), t.getMinutes()) })
  }

  private onChangeTime = (data: { hour: number, min: number }) => {
    const t = this.state.selected;
    this.setState({ ...this.state, selected: new Date(t.getFullYear(), t.getMonth(), t.getDate(), data.hour, data.min) })
  }

  private save = () => {
    this.props.onChange(this.state.selected);
    this.setState({ ...this.state, value: this.state.selected, isPopupShown: false, });
  }

  private closePopup = () => {
    this.setState({...this.state, isPopupShown: false})
  }

  render() {
    const tileClassName = ({ date, view }: CalendarTileProperties) => {
      const classNames = ['my-5p', 'body1'];
      if (view === 'month') {
        if (this.state.selected && isSameDay(date, this.state.selected)) {
          classNames.push('selected');
        } else if (this.minDate && isBefore(date, this.minDate)) {
          classNames.push('disabled');
        } else if (this.maxDate && isAfter(date, this.maxDate)) {
          classNames.push('disabled');
        } else if (isToday(date)) {
          classNames.push('today');
        }
      }
      return classNames;
    }

    return (
      <div>
        <input
          type="text"
          className="form-item-textfield"
          name="startAt"
          value={this.state.value ? format(this.state.value, 'MMM dd yyyy hh:mm a') : ''}
          readOnly
          onClick={() => {
            this.setState({ ...this.state, isPopupShown: true })
          }}
        />

        {
          this.state.isPopupShown ?
            <div className='pos-fixed top-0pc left-0pc w-100pc h-100pc blur' style={{ zIndex: 1000 }}>
              <div
                className='w-100pc h-100pc top-0pc left-0pc'
                style={{ opacity: 0.5, background: 'rgba(0,0,0,0.2)' }}
                onClick={this.closePopup}
              ></div>
              <div
                className='pos-absolute bg-white p-15p rounded-12p'
                style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%', margin: '0 auto', width: '90%', maxWidth: '400px' }}
              >
                <Calendar
                  calendarType='US'
                  locale="en"
                  tileClassName={tileClassName}
                  tileDisabled={this.tileDisabled}
                  value={this.state.selected}
                  onChange={this.onChangeCalendar}
                ></Calendar>

                <div className='my-20p'>
                  <TimePicker 
                  initialValue={this.state.value}
                  onChange={this.onChangeTime}

                  ></TimePicker>
                </div>

                <div className="d-flex main-axis-between">
                  <button
                    type="button"
                    className='btn-text-grey'
                    onClick={this.closePopup}
                  >Cancel</button>
                  <button
                    type="button"
                    className='btn-primary'
                    onClick={this.save}
                  >Save</button>
                </div>
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}