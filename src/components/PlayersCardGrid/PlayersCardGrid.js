import React from "react"
import PlayersCard from "../PlayersCard/PlayersCard";
import {getPlayerImage, getTeamImage} from "../../utility/utility";
import teamList from "../../assets/teams.json";

function PlayersCardGrid(props){

    const {playersList, col} = props;

    const arr = [];
    for(var i in playersList){
        arr.push([i, playersList[i]]);
    }

    // flag to decide whether show only the players of a team or all players
    const length = arr.length;
    let onlyTeam = false;
    if(length < 50){
        onlyTeam = true;
    }

    const playerCardsCol = playersList.filter((player) => player.isActive === true).map((player) => {

        const teamImage = teamList.filter((team) => team.teamId === parseInt(player.teamId))[0];

            return (
                <div className="col">
                    <PlayersCard
                        onlyTeam={onlyTeam}
                        number={parseInt(player.personId)}
                        name={player.temporaryDisplayName}
                        image={getPlayerImage(parseInt(player.personId))}
                        position={player.teamSitesOnly.posFull}
                        teamN1={teamImage.location}
                        teamN2={teamImage.simpleName}
                        teamImage={getTeamImage(teamImage.teamName)}
                        teamId={player.teamId}
                    />
                </div>
            )
    });

    return (
        <div className={`row
                 row-cols-${col.xs}
                 row-cols-sm-${col.sm}
                 row-cols-md-${col.md}
                 row-cols-lg-${col.lg}
                 row-cols-xl-${col.xl}
        `}>
            {playerCardsCol}
        </div>
    )
}

export default PlayersCardGrid;