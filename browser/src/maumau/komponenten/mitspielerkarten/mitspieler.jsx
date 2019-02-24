import {MitspielerKarten} from "./mitspieler_karten";
import React from "react"

export class Mitspieler extends React.Component {
    render() {
        return (
            <div className={"alleMitspieler"}>
                {this.props.mitspieler.map((mitspieler) =>
                    <MitspielerKarten mitspieler={mitspieler} key={mitspieler.name}/>
                )}
            </div>
        );
    }
}