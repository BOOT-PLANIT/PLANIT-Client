"use client";

import { Calendar, Card } from "@/shared/ui";
import type { DateData } from "@/shared/ui";

const Home = () => {
  const generateCurrentMonthData = (): DateData[] => {
    const dates: DateData[] = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    dates.push({
      date: new Date(currentYear, currentMonth, currentDay),
      status: "present",
      hasSession: true,
    });

    for (let i = -5; i <= 5; i++) {
      const date = new Date(currentYear, currentMonth, currentDay + i);
      if (date.getMonth() === currentMonth) {
        if (i !== 0) {
          if (date.getDay() !== 0 && date.getDay() !== 6) {
            dates.push({
              date: date,
              status: "present",
              hasSession: i % 2 === 0, // 짝수 날짜에만 세션이 있다고 가정
            });
          }
        }
      }
    }

    return dates;
  };

  const calendarDates = generateCurrentMonthData();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Card variant="solid" width="100%">
        <Calendar
          dates={calendarDates}
          initialMonth={new Date()}
          onDateSelect={(dates) => {
            console.log("Selected dates:", dates);
          }}
          onEdit={(dates) => {
            console.log("Edit dates:", dates);
          }}
        />
      </Card>
    </div>
  );
};

export default Home;
