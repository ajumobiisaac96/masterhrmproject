import React from 'react'

const Pagination = () => {
  return (
    <div>
        <div className="showing-entries">
            <div className="number-div">
                <p>showing <span>1</span>to <span>10</span>of <span>40 entries</span></p>
            </div>
                <div className="pagination">
                <p className='active-1'>01</p>
                <p>02</p>
                <p>03</p>
                <p>04</p>
                <p>05</p>
                <p>06</p>
                <p>07</p>
            </div>
            </div>
        </div>
  )
}

export default Pagination
