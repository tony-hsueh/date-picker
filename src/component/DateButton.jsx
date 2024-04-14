import dayjs from 'dayjs';
const DateButton = ({
  showOnlyCurMonth = false,
  startDate = null,
  endDate = null,
  dateformatByDayjs,
  handleDateRange,
}) => {
  const determineDateActive = (dateObj, startDate, endDate) => {
    return dateObj.isSame(startDate, 'day') ||
    dateObj.isSame(endDate, 'day') ||
    (dateObj.isBefore(endDate, 'day') && dateObj.isAfter(startDate, 'day'))
  }

  return (
    <button 
      className={`day-btn ${dayjs().isSame(dateformatByDayjs, 'day') ? 'today': 'not-today'} ${showOnlyCurMonth ? "non-cur-month" : 'cur-month'} ${determineDateActive(dateformatByDayjs, startDate, endDate) ? 'active' : 'inactive'}`}
      disabled={showOnlyCurMonth}
      onClick={() => {handleDateRange(dateformatByDayjs)}}
      type='button'
    >
      {dateformatByDayjs.format("D")}日
    </button>
  )
}

export default DateButton