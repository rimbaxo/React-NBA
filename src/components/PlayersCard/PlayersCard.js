import React from "react"
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import style from "./PlayersCard.Module.css"
import {playerDefaultImage} from "../../utility/utility";
import {NavLink} from "react-router-dom";

function PlayersCard(props) {

    const {onlyTeam, number, name, image, position, teamN1, teamN2, teamImage, teamId} = props;

    if(onlyTeam === false) {
        return (
            <NavLink to={`/players/${number}`}>
                <Card className={style.card}>
                    <CardImg
                        onError={(event) => playerDefaultImage(event)}
                        className={style.image}
                        top
                        width="100%"
                        src={image}
                        alt={name}
                    />
                    <CardBody className="text-center">
                        <p className={`h3 ${style.title}`}>{name}</p>
                        <CardText>
                            {position}
                        </CardText>
                        <div className={style.team}>
                            <p className={style.teamName}>{teamN1} {teamN2}</p>
                            <img className={style.teamLogoImage}
                                 src={teamImage}
                                 alt={"teamImage.teamName"}
                                 loading="lazy"/>
                        </div>
                    </CardBody>
                </Card>
            </NavLink>
        );
    }
    else{
        return (
            <NavLink to={`/players/${teamId}/${number}`}>
                <Card className={style.card}>
                    <CardImg
                        onError={(event) => playerDefaultImage(event)}
                        className={style.image}
                        top
                        width="100%"
                        src={image}
                        alt={name}
                    />
                    <CardBody className="text-center">
                        <p className={`h3 ${style.title}`}>{name}</p>
                        <CardText>
                            {position}
                        </CardText>
                        <div className={style.team}>
                            <p className={style.teamName}>{teamN1} {teamN2}</p>
                            <img className={style.teamLogoImage}
                                 src={teamImage}
                                 alt={"teamImage.teamName"}
                                 loading="lazy"/>
                        </div>
                    </CardBody>
                </Card>
            </NavLink>
        );
    }
}

export default PlayersCard;