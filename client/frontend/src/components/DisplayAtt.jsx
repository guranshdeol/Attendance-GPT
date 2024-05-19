import React, { useState, useEffect } from "react";

const DisplayAtt = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/attendance/attendance.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n");
        const parsedData = rows.map((row) => {
          const [time, name, id] = row.split(",");
          return { time, name, id };
        });
        setData(parsedData);
      })
      .catch((error) => {
        console.error("Error fetching CSV file:", error);
      });
  }, []);

  const downloadExcel = () => {
    const csvContent = data
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "attendance.xls");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={downloadExcel}
        className="bg-green-500 hover:bg-green-700 text-white fixed bottom-24 right-10 font-bold py-2 px-4 rounded"
      >
        Download attendance
      </button>
    </div>
  );
};

export default DisplayAtt;
