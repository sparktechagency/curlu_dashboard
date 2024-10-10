import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import NotFoundImg from "./assets/not-found.png"

function NotFound() {
  return (
    <div style={{
      background: "#BFF2EE",
      height:"100vh", 
      width:"100vw",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column"
    }}
    >
      <div style={{
        width: "630px",
        height: "735px",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "120px"
      }}>
        <img src={NotFoundImg} />
        <p style={{fontSize: "24px", margin: "43px 0", fontWeight: 400, textAlign: "center", color: "#4C4C4C"}}> Looks like you’ve got lost…. </p>
        <Button
          style={{
            width: "100%",
            height: "56px",
            background: "#F27405",
            borderRadius: "8px",
            color: "white",
            margin: "0 auto 0 auto",
            border: "none",
            outline: "none"
          }}
        >
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound