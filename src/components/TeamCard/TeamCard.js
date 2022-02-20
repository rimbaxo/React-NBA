import React from "react"
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import style from "./TeamCard.Module.css"
import {playerDefaultImage} from "../../utility/utility";
import {NavLink} from "react-router-dom";

function TeamCard(props) {

    const {number, name1, name2, teamImage} = props;

    return (
        <NavLink to={`/teams/${number}`}>
            <Card className={style.card}>
                <CardImg
                    onError={(event) => playerDefaultImage(event)}
                    className={style.image}
                    top
                    width="100%"
                    src={teamImage}
                    alt={name1}
                />
                <CardBody className="text-center">
                    <p className={`h3 ${style.title}`}>{name1} {name2}</p>
                </CardBody>
            </Card>
        </NavLink>
    );
}

export default TeamCard;
