import React from 'react'
import "./style.css";

const NewsContainer = ({news}:{news:string}) => {
  return (
    <div className='kpt_artist_info_box'>
      <p>{news}</p>
    </div>
    
  )
}

export default NewsContainer
