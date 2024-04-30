import React, { useEffect, useState } from 'react';
import { Calendar, Card } from 'antd';
import { API } from "../constant";
import Main from "../components/layout/Main";

const LeaveCalendar = () => {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`${API}`);
        if (!response.ok) {
          throw new Error('Failed to fetch leave data');
        }
        const data = await response.json();
        setLeaveData(data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, []);

  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const leaveEntry = leaveData.find(entry => entry.date === dateString);

    if (leaveEntry) {
      return (
        <div>
          {leaveEntry.name}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Main>
    <Card  style={{marginBottom:'60px', marginTop:'30px'}}>
    <Calendar
      dateCellRender={dateCellRender}
      
    />
    </Card>
    </Main>
  );
};

export default LeaveCalendar;
