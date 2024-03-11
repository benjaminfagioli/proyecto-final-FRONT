import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React, { useState } from "react";
import { addDays, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";
import "../styles/datePicker.css";
const DatePicker = ({ room, infoReserve }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleChange = ({ selection }) => {
    setDates([selection]);
    infoReserve.current.from = selection.startDate.toLocaleDateString("en-us");
    infoReserve.current.to = selection.endDate.toLocaleDateString("en-us");
  };
  const reservedDates = [];
  if (room) {
    const { reserves } = room;
    reserves.forEach((reserva) => {
      let differenceDays = Math.abs(
        differenceInCalendarDays(reserva.from, reserva.to)
      );
      for (let i = 0; i < differenceDays + 1; i++) {
        reservedDates.push(
          addDays(reserva.from, i).toLocaleDateString("en-us")
        );
      }
    });
  }
  let actualDate = new Date();
  return (
    <DateRange
      onChange={handleChange}
      minDate={actualDate}
      maxDate={
        new Date(
          actualDate.getFullYear() + 1,
          actualDate.getMonth(),
          actualDate.getDate()
        )
      }
      moveRangeOnFirstSelection={false}
      months={window.matchMedia("(max-width:768px)").matches ? 1 : 2}
      ranges={dates}
      direction="horizontal"
      editableDateInputs={true}
      disabledDates={reservedDates}
      locale={es}
      color="#aaa"
      rangeColors={["aaa"]}
    />
  );
};

export default DatePicker;
