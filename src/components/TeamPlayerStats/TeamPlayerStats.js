import React from "react"
import playersListData from "../../assets/players.json";
import style from "../PlayerStats/PlayerStats.Module.css";
import {NavLink} from "react-router-dom";
import {find_next_id, find_prev_id, getPlayerImage, getTeamImage, playerDefaultImage} from "../../utility/utility";
import {useEffect, useState} from "react";
import teamList from "../../assets/teams.json";

// Component to scroll ONLY the players of a given team.
// This component is accessed when a player's card is clicked on the TeamDetails page.
function TeamPlayerStats(props) {

    const {match} = props;
    const id = parseInt(match.params.number);
    const team = parseInt(match.params.team);

    // New player list filtered to obtain only the players that belong to a specific team
    const newPlayerList = playersListData.filter((player) => parseInt(player.teamId) === team);

    const currentPlayer = newPlayerList.filter((player) => parseInt(player.personId) === id)[0];

    const teamImage = teamList.filter((squad) => squad.teamId === parseInt(currentPlayer.teamId))[0];

    const ids = newPlayerList.filter((player) => player.isActive === true).map(function(player){return parseInt(player.personId);});

    // Here we store the id of the current player
    const [playerId, setPlayerId] = useState([]);

    // Here we store the final stats of the player
    const [playerFinalStats, setPlayerFinalStats] = useState([]);

    useEffect(() => {

        let isMounted = true;

        fetch(`https://www.balldontlie.io/api/v1/players?search=${currentPlayer.teamSitesOnly.playerCode}`)
            .then(res => res.json())
            .then(res => {
                if(isMounted)
                    setPlayerId(res.data.map((res0) => {
                        return res0.id;
                    }));
            })
            .catch((error) => console.log("Error" + error));

        return () => {
            isMounted = false;
        }

    }, [id]);

    useEffect(() => {

        let isMounted = true;

        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId[0]}`)
            .then(res1 => res1.json())
            .then(res1 => {
                if(isMounted)
                    setPlayerFinalStats(res1.data[0]);
            })
            .catch((error) => console.log("Error" + error));

        return () => {
            isMounted = false;
        }

    }, [playerId]);

    return (

        <div className="container">
            <div className="row">

                <div className="col">


                    <div className={style.navigation}>

                        {ids.indexOf(id) !==0 &&
                        <NavLink className={`${style.navItem}`} to={`/players/${team}/${find_prev_id(id,ids)}`}> &lt; </NavLink>
                        }

                        <h1>{currentPlayer.firstName} {currentPlayer.lastName}</h1>

                        {ids.indexOf(id)!==ids.length-1 &&
                        <NavLink className={`${style.navItem}`} to={`/players/${team}/${find_next_id(id,ids)}`}> &gt; </NavLink>
                        }
                    </div>
                </div>
            </div>

            <div className={`row mt-5 mb-5 ${style.playerContainer}`}>
                <div className={`col-sm-3 ${style.colBorder}`}>
                    <div className="row">
                        <div className="col">
                            <strong className={style.label}>Profile:</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <img className={style.image} onError={(event) => playerDefaultImage(event)}
                                 src={getPlayerImage(id)}
                                 alt={currentPlayer.teamSitesOnly.playerCode}/>

                            <div className={style.statsContainer}>
                                <ul className={style.playerInfo}>
                                    <li key={currentPlayer.teamSitesOnly.posFull}>
                                        <span className={style.statName}>Position:</span>
                                        <span className={style.statValue}>{currentPlayer.teamSitesOnly.posFull}</span>
                                    </li>
                                    <li key={currentPlayer.dateOfBirthUTC}>
                                        <span className={style.statName}>Date of birth:</span>
                                        <span className={style.statValue}>{currentPlayer.dateOfBirthUTC}</span>
                                    </li>
                                    <li key={currentPlayer.country}>
                                        <span className={style.statName}>Country:</span>
                                        <span className={style.statValue}>{currentPlayer.country}</span>
                                    </li>
                                    <li key={currentPlayer.heightMeters}>
                                        <span className={style.statName}>Height:</span>
                                        <span className={style.statValue}>{currentPlayer.heightMeters} m</span>
                                    </li>
                                    <li key={currentPlayer.weightKilograms}>
                                        <span className={style.statName}>Weight:</span>
                                        <span className={style.statValue}>{currentPlayer.weightKilograms} Kg</span>
                                    </li>
                                    <li key={currentPlayer.jersey}>
                                        <span className={style.statName}>Jersey number:</span>
                                        <span className={style.statValue}>{currentPlayer.jersey}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-sm-6 offset-sm-1 ${style.colBorder}`}>
                    <div className="row">
                        <div className="col">
                            <strong className={style.label}>Stats:</strong>
                        </div>
                    </div>
                    <div className="row">
                        {playerFinalStats &&
                        <div className="col">
                            <div className={style.statsContainer}>
                                <ul className={style.stats}>
                                    <li key={playerFinalStats.games_played}>
                                        <span className={style.statName}>GAMES PLAYED</span>
                                        <span className={style.statValue}>{playerFinalStats.games_played}</span>
                                    </li>
                                    <li key={playerFinalStats.min}>
                                        <span className={style.statName}>MIN</span>
                                        <span className={style.statValue}>{playerFinalStats.min}</span>
                                    </li>
                                    <li key={playerFinalStats.fgm}>
                                        <span className={style.statName}>FGM</span>
                                        <span className={style.statValue}>{playerFinalStats.fgm}</span>
                                    </li>
                                    <li key={playerFinalStats.fga}>
                                        <span className={style.statName}>FGA</span>
                                        <span className={style.statValue}>{playerFinalStats.fga}</span>
                                    </li>
                                    <li key={playerFinalStats.fg3m}>
                                        <span className={style.statName}>FG3M</span>
                                        <span className={style.statValue}>{playerFinalStats.fg3m}</span>
                                    </li>
                                    <li key={playerFinalStats.fg3a}>
                                        <span className={style.statName}>FG3A</span>
                                        <span className={style.statValue}>{playerFinalStats.fg3a}</span>
                                    </li>
                                    <li key={playerFinalStats.ftm}>
                                        <span className={style.statName}>FTM</span>
                                        <span className={style.statValue}>{playerFinalStats.ftm}</span>
                                    </li>
                                    <li key={playerFinalStats.fta}>
                                        <span className={style.statName}>FTA</span>
                                        <span className={style.statValue}>{playerFinalStats.fta}</span>
                                    </li>
                                    <li key={playerFinalStats.oreb}>
                                        <span className={style.statName}>OREB</span>
                                        <span className={style.statValue}>{playerFinalStats.oreb}</span>
                                    </li>
                                    <li key={playerFinalStats.dreb}>
                                        <span className={style.statName}>DREB</span>
                                        <span className={style.statValue}>{playerFinalStats.dreb}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>}
                        {playerFinalStats &&
                        <div className="col">
                            <div className={style.statsContainer}>
                                <ul className={style.stats}>
                                    <li key={playerFinalStats.reb}>
                                        <span className={style.statName}>REB</span>
                                        <span className={style.statValue}>{playerFinalStats.reb}</span>
                                    </li>
                                    <li key={playerFinalStats.ast}>
                                        <span className={style.statName}>AST</span>
                                        <span className={style.statValue}>{playerFinalStats.ast}</span>
                                    </li>
                                    <li key={playerFinalStats.stl}>
                                        <span className={style.statName}>STL</span>
                                        <span className={style.statValue}>{playerFinalStats.stl}</span>
                                    </li>
                                    <li key={playerFinalStats.blk}>
                                        <span className={style.statName}>BLK</span>
                                        <span className={style.statValue}>{playerFinalStats.blk}</span>
                                    </li>
                                    <li key={playerFinalStats.turnover}>
                                        <span className={style.statName}>TURNOVER</span>
                                        <span className={style.statValue}>{playerFinalStats.turnover}</span>
                                    </li>
                                    <li key={playerFinalStats.pf}>
                                        <span className={style.statName}>PF</span>
                                        <span className={style.statValue}>{playerFinalStats.pf}</span>
                                    </li>
                                    <li key={playerFinalStats.pts}>
                                        <span className={style.statName}>PTS</span>
                                        <span className={style.statValue}>{playerFinalStats.pts}</span>
                                    </li>
                                    <li key={playerFinalStats.fg_pct}>
                                        <span className={style.statName}>FG-PCT</span>
                                        <span className={style.statValue}>{playerFinalStats.fg_pct}</span>
                                    </li>
                                    <li key={playerFinalStats.fg3_pct}>
                                        <span className={style.statName}>FG3-PCT</span>
                                        <span className={style.statValue}>{playerFinalStats.fg3_pct}</span>
                                    </li>
                                    <li key={playerFinalStats.ft_pct}>
                                        <span className={style.statName}>FT-PCT</span>
                                        <span className={style.statValue}>{playerFinalStats.ft_pct}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>}
                        {!playerFinalStats &&
                            <div className="col">
                                <p> This player is injuried from the beginning of the current season.</p>
                        </div>}
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="row">
                        <div className="col">
                            <strong className={style.label}>Team:</strong>
                        </div>
                    </div>
                    <NavLink to={`/teams/${parseInt(currentPlayer.teamId)}`}>
                        <img className={style.teamLogoImage}
                             src={getTeamImage(teamImage.teamName)}
                             alt={"teamImage.teamName"}
                             loading="lazy"/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default TeamPlayerStats;