import React from 'react'
import CustomHeader from '../components/Header'
import Articles from '../components/Articles'
import StaffPicks from '../components/StaffPicks'

function Home() {
  return (
    <div style={{}}>
      <CustomHeader></CustomHeader>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 100px' }}>
        <Articles />

        {/* Vertical line */}
        <div
          style={{
            width: '1px',
            backgroundColor: '#e0e0e0',
            margin: '0 20px',
            height: 'auto',
          }}
        />

        <StaffPicks />
      </div>
    </div>

  )
}

export default Home;