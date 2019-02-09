import React, {Component} from "react";

export class Karte extends Component {
    constructor(props) {
        super(props);

        this.beiClick = this.beiClick.bind(this);
    }

    beiClick() {
        this.props.beiClick(this.props.position);
    }

    render() {
        return (
            <img src={"/karten/" + this.props.karte.art + "/" + this.props.karte.wert + ".svg"}
                 className={"karte"}
                 onClick={this.beiClick}
            />
        )
    }
}