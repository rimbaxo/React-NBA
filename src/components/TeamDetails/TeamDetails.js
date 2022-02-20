import React, {useEffect, useState} from "react";
import PlayersCardGrid from "../PlayersCardGrid/PlayersCardGrid";
import playersListData from "../../assets/players.json";
import teamList from "../../assets/teams.json"
import style from "./TeamDetails.Module.css";
import {getTeamImage} from "../../utility/utility";

function TeamDetails(props){

    const {match} = props;
    const team = parseInt(match.params.number);

    const [teamInfo, setTeamInfo] = useState([]);

    const playerList = playersListData.filter((player) => parseInt(player.teamId) === team);

    const nba = require("nba.js").default;

    useEffect(() => {

        let isMounted = true;

        nba.data.teams({
            year: 2021
        }).then(res => {
            if(isMounted)
                setTeamInfo(res.league.standard.filter((team1) => parseInt(team1.teamId) === team)[0]);
        }).catch(function (err) {
            console.error(err);
        });

        return () => {
            isMounted = false;
        }
    }, [team]);

    const teamInfoTable = () => {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        {teamInfo &&
                        <div className={style.statsContainer}>
                            <ul className={style.stats}>
                                <li key={teamInfo.fullName}>
                                    <span className={style.statName}>Name:</span>
                                    <span className={style.statValue}>{teamInfo.fullName}</span>
                                </li>
                                <li key={teamInfo.city}>
                                    <span className={style.statName}>City:</span>
                                    <span className={style.statValue}>{teamInfo.city}</span>
                                </li>
                                <li key={teamInfo.tricode}>
                                    <span className={style.statName}>Abbreviation:</span>
                                    <span className={style.statValue}>{teamInfo.tricode}</span>
                                </li>
                                <li key={teamInfo.confName}>
                                    <span className={style.statName}>Conference:</span>
                                    <span className={style.statValue}>{teamInfo.confName}</span>
                                </li>
                                <li key={teamInfo.divName}>
                                    <span className={style.statName}>Division:</span>
                                    <span className={style.statValue}>{teamInfo.divName}</span>
                                </li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5 mb-5">

            <div className="row">
                <div className="col">
                    <strong className={style.title}>{teamInfo.fullName}</strong>
                </div>
            </div>
            <div className={`${style.infoContainer} mt-5 row d-flex flex-md-row flex-sm-column align-items-sm-start align-items-md-center justify-content-between mb-5 mt-2`}>
                <div className="col-sm-3 col-lg-4">
                    <div className={style.imgContainer}>
                        <img
                            className={style.image}
                            src={getTeamImage(teamList.filter((teamx) => parseInt(teamx.teamId) === team)[0].teamName)}
                            alt={teamInfo.fullName}
                        />
                    </div>
                </div>
                <div className="col-sm-4">
                    {teamInfoTable()}
                </div>
                <div className="col-sm-4 col-md-2 offset-sm-2">
                    <button className={style.button}>
                        <a href={`https://www.nba.com/${teamInfo.urlName}`} target="_blank"> More Info!</a>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <strong className={style.label}>Rooster:</strong>
                </div>
            </div>
            <div className="row justify-content-center mt-3 mb-5">
                <div className="col">

                    <PlayersCardGrid
                        playersList={playerList}
                        col={{xs:1, sm:2, md:3, lg:4, xl:5}}
                    />
                </div>
            </div>
        </div>
    )
}

export default TeamDetails;