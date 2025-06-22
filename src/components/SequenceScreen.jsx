import React from 'react'

const SequenceScreen = ({ number, score }) => {
  return (

    <div>

        {/* Display Number */}
        <div>
            {number !== null ? (
                <p className='text-8xl font-bold text-black'>{number}</p>
            ) : (
                <p className='text-4xl text-gray-400'>Loading...</p>
            )}
        </div>


    </div>


  )
}

export default SequenceScreen