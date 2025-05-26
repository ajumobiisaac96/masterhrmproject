import React from 'react';


const ColorLegend = ({ statusCounts = {} }) => {
  const legendItems = [
    { color: '#A2FAC3', label: 'present', key: 'present' },
    { color: '#FD9292', label: 'absent', key: 'absent' },
    { color: '#FAFC8B', label: 'Leave', key: 'on_leave' },
    { color: '#7EB1FF', label: 'Undertime', key: 'undertime' },
  ];

  return (
    <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
      {legendItems.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: item.color,
              border: '1.5px solid #555',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '16px', color: '#333', whiteSpace: 'nowrap' }}>
            {item.label}: {statusCounts[item.key] ?? 0}
          </span>
        </div>
      ))}
    </div>
  );
};



export default ColorLegend;