import React from 'react';

const Pagination = ({
  totalEntries,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / pageSize);

  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  return (
    <div>
      <div className="showing-entries">
        <div className="number-div">
          <p>
            Showing <span>{startEntry}</span> to <span>{endEntry}</span> of <span>{totalEntries}</span> entries
          </p>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <p
              key={idx + 1}
              className={currentPage === idx + 1 ? 'active-1' : ''}
              style={{
                cursor: 'pointer',
                fontWeight: currentPage === idx + 1 ? 'bold' : 'normal',
                color: currentPage === idx + 1 ? '#007BFF' : '#222',
                borderRadius: '6px',
                padding: '2px 8px',
                margin: '0 2px',
                border: currentPage === idx + 1 ? '1.5px solid #007BFF' : '1.5px solid transparent',
                background: currentPage === idx + 1 ? '#F0F8FF' : 'transparent',
                transition: 'all 0.2s'
              }}
              onClick={() => onPageChange(idx + 1)}
            >
              {String(idx + 1).padStart(2, '0')}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
