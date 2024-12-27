import { useState } from 'react'
import dayjs from 'dayjs';
import DateButton from './component/DateButton';
import './App.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DatePicker = ({showOnlyCurMonth = false, onChange}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [dayObj, setDayObj] = useState(dayjs())
  // 日曆上顯示年月份
  const [curYear,curMonth] = dayObj.format("YYYY-M").split('-');
  // 第一行要有該月1號，所以先找出1號在禮拜幾，得到的數字就是要補幾天上個月的日期
  const firstDayInMonth = dayObj.date(1).day()
  // 這個月有幾天
  const daysInMonth = dayObj.daysInMonth()
  // 這個月最後一天是星期幾，用 6 減去就是下個月該補的天數
  const lastDayInMonth = dayObj.endOf('month').day()
  const allDates = [];

  for (let i = firstDayInMonth; i > 0; i--) {
    allDates.push(dayObj.date(1).subtract(i, 'day'))
  }
  for (let i = 1; i <= daysInMonth; i++) {
    allDates.push(dayObj.date(i))
  }
  for (let i = 1; i <= 6 - lastDayInMonth; i++) {
    allDates.push(dayObj.endOf('month').add(i, 'day'))
  }

  const handleDateRange = (dateObj) => {
    if (startDate === null || dateObj.isBefore(startDate)) {
      setStartDate(dateObj)
      setEndDate(null)
    } else {
      setEndDate(dateObj)
      onChange && onChange([startDate, dateObj])
    }
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
            type='button'
          >
            <FaChevronLeft />
          </button>
          <span>{curYear}年{curMonth}月</span>
          <button 
            className="next-month" 
            onClick={() => {
              setDayObj(prev => prev.add(1, 'month'))
            }}
            disabled={showOnlyCurMonth}
            type='button'
          >
            <FaChevronRight />
          </button>
        </div>
        <div className='calendar'>   
          {allDates.map(date => (
            <DateButton 
              key={date}
              showOnlyCurMonth={showOnlyCurMonth}
              startDate={startDate}
              endDate={endDate}
              dateformatByDayjs={date}
              handleDateRange={handleDateRange}
              isCurMonth={date.isSame(dayObj, 'month')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DatePicker