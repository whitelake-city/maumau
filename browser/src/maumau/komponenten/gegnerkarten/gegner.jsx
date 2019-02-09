import {GegnerKarten} from "./gegner_karten";
import React from "react"

export class Gegner extends React.Component {
    render() {
        return (
            <div className={"alleGegner"}>
                {this.props.gegner.map((gegner) =>
                    <GegnerKarten gegner={gegner} key={gegner.name}/>
                )}
            </div>
        );
    }
}