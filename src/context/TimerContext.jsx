// src/context/TimerContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [workingHours, setWorkingHours] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  // Load timer state from localStorage on first load
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('employeeTimerState'));
    if (savedState) {
      setWorkingHours(savedState.workingHours);
      setBreakTime(savedState.breakTime);
      setIsTimerRunning(savedState.isTimerRunning);
      setIsBreakActive(savedState.isBreakActive);
      setClockInTime(savedState.clockInTime ? new Date(savedState.clockInTime) : null);
      setClockOutTime(savedState.clockOutTime ? new Date(savedState.clockOutTime) : null);
    }
  }, []);

  // Save timer state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('employeeTimerState', JSON.stringify({
      workingHours,
      breakTime,
      isTimerRunning,
      isBreakActive,
      clockInTime,
      clockOutTime,
    }));
  }, [workingHours, breakTime, isTimerRunning, isBreakActive, clockInTime, clockOutTime]);

  // Working hours timer
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setWorkingHours(prev => prev + 1000);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Break timer
  useEffect(() => {
    let breakTimer;
    if (isBreakActive) {
      breakTimer = setInterval(() => {
        setBreakTime(prev => prev + 1000);
      }, 1000);
    }
    return () => clearInterval(breakTimer);
  }, [isBreakActive]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setClockInTime(new Date());
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setIsBreakActive(false);
    setClockOutTime(new Date());
  };

  const startBreak = () => {
    setIsBreakActive(true);
  };

  const endBreak = () => {
    setIsBreakActive(false);
  };

  const formatTime = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <TimerContext.Provider value={{
      workingHours,
      breakTime,
      isTimerRunning,
      isBreakActive,
      clockInTime,
      clockOutTime,
      startTimer,
      stopTimer,
      startBreak,
      endBreak,
      formatTime,
    }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the context easily
export const useTimer = () => useContext(TimerContext);
