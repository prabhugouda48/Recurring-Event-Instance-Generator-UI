import React, { useState } from "react";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function App() {
  const [startDate, setStartDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [occurrences, setOccurrences] = useState(1);
  const [viewStart, setViewStart] = useState("");
  const [viewEnd, setViewEnd] = useState("");
  const [instances, setInstances] = useState([]);

  const generateInstances = () => {
    const start = new Date(startDate);
    const dayOffset = (daysOfWeek.indexOf(dayOfWeek) - start.getDay() + 7) % 7;
    const firstEvent = new Date(start);
    firstEvent.setDate(firstEvent.getDate() + dayOffset);

    const events = [];
    for (let i = 0; i < occurrences; i++) {
      const instance = new Date(firstEvent);
      instance.setDate(instance.getDate() + i * 7);
      events.push(instance);
    }

    const viewStartDate = new Date(viewStart);
    const viewEndDate = new Date(viewEnd);
    const filtered = events.filter(d => d >= viewStartDate && d <= viewEndDate);
    setInstances(filtered);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Recurring Event Generator</h1>
      <label className="block mb-2">Event Start Date:
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-1 w-full" />
      </label>
      <label className="block mb-2">Day of Week:
        <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="border p-1 w-full">
          {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </label>
      <label className="block mb-2">Number of Occurrences:
        <input type="number" value={occurrences} onChange={e => setOccurrences(e.target.value)} className="border p-1 w-full" />
      </label>
      <label className="block mb-2">View Window Start:
        <input type="date" value={viewStart} onChange={e => setViewStart(e.target.value)} className="border p-1 w-full" />
      </label>
      <label className="block mb-2">View Window End:
        <input type="date" value={viewEnd} onChange={e => setViewEnd(e.target.value)} className="border p-1 w-full" />
      </label>
      <button onClick={generateInstances} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Generate Instances</button>
      <ul className="mt-4">
        {instances.map((date, idx) => (
          <li key={idx} className="border-b py-1">{date.toDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
