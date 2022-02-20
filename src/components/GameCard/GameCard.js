import React from "react"
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import style from "./GameCard.Module.css";
import teamList from "../../assets/teams.json"
import {getTeamImage, truncateStr} from "../../utility/utility";

function GameCard(props){

    const {date, home_team, home_team_score, visitor_team, visitor_team_score} = props;

    const home_team_image = getTeamImage(teamList.filter((team) => team.abbreviation === home_team)[0].teamName);
    const visitor_team_image = getTeamImage(teamList.filter((team) => team.abbreviation === visitor_team)[0].teamName);

        return (
                <Card className={style.card}>
                    <CardBody className="text-center">
                        <div className="d-flex mb-3 align-items-center justify-content-center">
                            <Card className={style.teamCard}>
                                <CardImg
                                    className={style.image}
                                    top
                                    width="100%"
                                    src={home_team_image}
                                    alt={home_team}
                                />
                                <div className="d-inline">
                                    <p className={`h3 ${style.teamname}`}>{home_team}</p>
                                    <p className={`h3 ${style.title} `}>{home_team_score}</p>
                                </div>
                            </Card>
                            <div>
                                VS
                            </div>
                            <Card className={style.teamCard}>
                                <CardImg
                                    className={style.image}
                                    top
                                    width="100%"
                                    src={visitor_team_image}
                                    alt={visitor_team}
                                />
                                <div className="d-inline">
                                    <p className={`h3 ${style.teamname}`}>{visitor_team}</p>
                                    <p className={`h3 ${style.title} `}>{visitor_team_score}</p>
                                </div>
                            </Card>
                        </div>
                        <CardText className={style.date}>
                            {truncateStr(date, 11)}
                        </CardText>
                    </CardBody>
                </Card>
        );
}

export default GameCard;