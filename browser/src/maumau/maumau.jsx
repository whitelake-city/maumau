import React from 'react';
import {SpielerKarten} from "./komponenten/spieler_karten";

const MauMau = (startParameter) => {
    return (
        <div>
            <SpielerKarten spielername={startParameter.match.params.spielername}/>
        </div>
    )
}

export default MauMau;
