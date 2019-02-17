import * as React from "react";
import {KartenRueckseite} from "../karten/kartenRueckseite";

export class MitspielerKarten extends React.Component {
    render() {
        return (
            <div className={"mitspieler"}>
                <div className={"karten " + (this.props.mitspieler.karten > 3 ? 'ueberlappend' : '')}>
                    {
                        [...Array(this.props.mitspieler.karten)]
                            .map((x, idx) => <KartenRueckseite key={idx}/>)
                    }
                </div>
                <h1 className={"name"}>{this.props.mitspieler.name}</h1>
            </div>
        );
    }
}