import { useState } from "react";
import {
  CalendarWrapper,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  DaysNames,
  DayName,
  Cells,
  Cell,
  Period,
  DateControl,
} from "./Calendar.styles";

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const DAY_NAMES = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

function buildCells(year, month) {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Mon-based

  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, other: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, other: false });
  while (cells.length % 7 !== 0)
    cells.push({
      day: cells.length - daysInMonth - startOffset + 1,
      other: true,
    });
  return cells;
}

export default function Calendar({ selectedDate, onSelect }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const cells = buildCells(year, month);

  const isToday = (d, other) =>
    !other &&
    d === now.getDate() &&
    month === now.getMonth() &&
    year === now.getFullYear();

  const isSelected = (d, other) => {
    if (!selectedDate || other) return false;
    const [sd, sm, sy] = selectedDate.split(".").map(Number);
    return d === sd && month === sm - 1 && year === (sy < 100 ? 2000 + sy : sy);
  };

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const handleCell = (d, other) => {
    if (other || !onSelect) return;
    const dd = String(d).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    const yy = String(year).slice(-2);
    onSelect(`${dd}.${mm}.${yy}`);
  };

  return (
    <CalendarWrapper>
      <CalendarTitle className="subttl">Даты</CalendarTitle>
      <CalendarBlock>
        {/* Nav */}
        <CalendarNav>
          <CalendarMonth>
            {MONTH_NAMES[month]} {year}
          </CalendarMonth>
          <NavActions>
            <NavAction onClick={prev}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavAction>
            <NavAction onClick={next}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavAction>
          </NavActions>
        </CalendarNav>

        {/* Grid */}
        <CalendarContent>
          <DaysNames>
            {DAY_NAMES.map((n, i) => (
              <DayName key={n} $weekend={i >= 5}>
                {n}
              </DayName>
            ))}
          </DaysNames>
          <Cells>
            {cells.map((c, i) => {
              const dow = i % 7;
              const isWeekend = !c.other && (dow === 5 || dow === 6);

              return (
                <Cell
                  key={i}
                  $other={c.other}
                  $weekend={isWeekend}
                  $current={isToday(c.day, c.other)}
                  $active={isSelected(c.day, c.other)}
                  onClick={() => handleCell(c.day, c.other)}
                >
                  {c.day}
                </Cell>
              );
            })}
          </Cells>
        </CalendarContent>

        {/* Period */}
        <Period>
          {selectedDate ? (
            <p>
              Срок исполнения: <DateControl>{selectedDate}</DateControl>
            </p>
          ) : (
            <p>Выберите срок исполнения</p>
          )}
        </Period>
      </CalendarBlock>
    </CalendarWrapper>
  );
}