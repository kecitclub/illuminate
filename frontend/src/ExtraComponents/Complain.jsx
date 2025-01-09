import React, { useState } from "react";


export default function Complain(props) {
  const [isExpand, setIsExpand] = useState(false);
 
  return (
    <div
      className={`${
        isExpand == false ? "complainComponent" : "complainComponentExp"
      }`}
      onClick={()=>{setIsExpand(isExpand==true?false:true)}}
    >
      {isExpand==false && <div className= "complainStatus">{props.status}</div> }
     
      <div className="complainName ">{props.name}  {isExpand==false && <div className="complainUsername">({props.username})</div>}</div>
      <div className=""></div>
      
      <div className="complainDescription">{isExpand==false?((props.description.length)>180 ? (props.description.slice(0, 300)+".."):props.description):props.description}</div>
      <div className={`${ isExpand == false ? "complainAddress" : "complainAddressExp" }`}>
            Address:{props.address}
      </div>
      {isExpand==true && <div className= "complainStatusExp">Status : <span className="complainStatusText"> {props.status}</span></div> }
      {isExpand==true && <div className="complainUsernameExp">Created by:{props.username}</div>}

      {isExpand && (
          <div className="complainDate">Created Date:{props.createdAt}</div>
      )}
    
    </div>
  );
}
