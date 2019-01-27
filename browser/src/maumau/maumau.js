import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MauMau = (startParameter) => {
  return (
    <div>
      <h1>Willkomen {startParameter.match.params.spielername}</h1>
      <div>MauMau</div>
    </div>
  )
}

export default MauMau;
