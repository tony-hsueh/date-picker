import { useState } from 'react'
import dayjs from 'dayjs';
import './App.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DatePicker = ({showOnlyCurMonth = false}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [dayObj, setDayObj] = useState(dayjs())
  // 日曆上顯示年月份
  const [curYear,curMonth] = dayObj.format("YYYY-MM").split('-');
  // 第一行要有該月1號，所以先找出1號在禮拜幾，得到的數字就是要補幾天上個月的日期
  const firstDayInMonth = dayObj.date(1).day()
  // 這個月有幾天
  const daysInMonth = dayObj.daysInMonth()
  // 該月最後一天需要補幾天 6 - lastDayInMonth
  const lastDayInMonth = (firstDayInMonth + (daysInMonth%7 - 1)) > 6 ? (firstDayInMonth + (daysInMonth%7 - 1)) - 7 : (firstDayInMonth + (daysInMonth%7 - 1));
  

  const handleDateRange = (dateObj) => {
    if (startDate === null || dateObj.isBefore(startDate)) {
      setStartDate(dateObj)
      setEndDate(null)
    } else {
      setEndDate(dateObj)
    }
  }

  const determineDateActive = (dateObj, startDate, endDate) => {
    return dateObj.isSame(startDate, 'day') ||
    dateObj.isSame(endDate, 'day') ||
    (dateObj.isBefore(endDate, 'day') && dateObj.isAfter(startDate, 'day'))
  }

  return (
    <div style={{padding: '2rem'}}>
      <div className='date-picker-container'>
        <div className="header">
          <button 
            className="prev-month"
            onClick={() => {
              setDayObj(prev => prev.subtract(1, 'month'))
            }}
            disabled={showOnlyCurMonth}
          >
            <FaChevronLeft />
          </button>
          <span>{curYear}-{curMonth}</span>
          <button 
            className="next-month" 
            onClick={() => {
              setDayObj(prev => prev.add(1, 'month'))
            }}
            disabled={showOnlyCurMonth}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className='calendar'>
          {Array.from({length: firstDayInMonth}, (v, i) => i).map((el,index) => {
            const dateformatByDayjs = dayObj.date(1).subtract(firstDayInMonth-index, 'day')
            return(
              <button 
                key={dateformatByDayjs} 
                className={`day-btn ${showOnlyCurMonth && "non-cur-month"} ${determineDateActive(dateformatByDayjs, startDate, endDate) ? 'active' : 'inactive'}`}
                disabled={showOnlyCurMonth}
                onClick={() => {handleDateRange(dateformatByDayjs)}}
              >
                {dateformatByDayjs.format("D")}日
              </button>
            )} 
          )}
          {Array.from({length: daysInMonth}, (v, i) => i).map((el,index) => {
            const dateformatByDayjs = dayObj.date(index+1)
            return(
              <button 
                key={dateformatByDayjs} 
                className={`day-btn ${dayjs().isSame(dateformatByDayjs, 'day') ? 'today' : 'not-today'} ${determineDateActive(dateformatByDayjs, startDate, endDate) ? 'active' : 'inactive'}`}
                onClick={() => {handleDateRange(dateformatByDayjs)}}
              >
                {dateformatByDayjs.format("D")}日
              </button>  
            )}
          )}
          {Array.from({length: 6 - lastDayInMonth}, (v, i) => i).map((el,index) => {
            const dateformatByDayjs = dayObj.date(daysInMonth).add(index + 1, 'day')
            return (
              <button 
                key={dateformatByDayjs} 
                className={`day-btn ${showOnlyCurMonth && "non-cur-month"} ${determineDateActive(dateformatByDayjs, startDate, endDate) ? 'active' : 'inactive'}`}
                disabled={showOnlyCurMonth}
                onClick={() => {handleDateRange(dateformatByDayjs)}}
              >
                {dateformatByDayjs.format("D")}日
              </button>
            )} 
          )}
        </div>
      </div>
    </div>
  )
}

export default DatePicker