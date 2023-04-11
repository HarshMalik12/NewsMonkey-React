import React from 'react';
import Loading from './loading.gif';

const spinner  =() =>{
  
    return (
      <div style={{ display: "flex", justifyContent: "center" }} >
            <img className="my-3" src={Loading} alt="Loading..." />
      </div>
    )
  
}

export default spinner