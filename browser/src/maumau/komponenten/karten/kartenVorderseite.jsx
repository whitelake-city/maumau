import React, {Component} from "react";

export class KartenVorderseite extends Component {
    constructor(props) {
        super(props);

        this.beiClick = this.beiClick.bind(this);
    }

    beiClick() {
        if (this.props.beiClick !== undefined && this.props.position !== undefined) {
            this.props.beiClick(this.props.position);
        }
    }

    render() {
        return (
            <img src={"/karten/" + this.props.karte.art + "/" + this.props.karte.wert + ".svg"}
                 className={"kartenvorderseite"}
                 onClick={this.beiClick}
            />
        )
    }
}