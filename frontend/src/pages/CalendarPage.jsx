import { useState } from "react";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg cursor-pointer ${selectedDate === index ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedDate(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
