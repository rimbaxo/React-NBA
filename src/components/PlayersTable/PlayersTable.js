import React from "react"
import {getPlayerImage, getTeamImage, playerDefaultImage} from "../../utility/utility";
import style from "./PlayersTable.module.css";
import teamList from "../../assets/teams.json"
import {useHistory} from "react-router-dom";

function PlayersTable(props){
    const {playersList} = props;

    const history = useHistory();

    // filter to obtain only the active players
    const playerTr = playersList.filter((player) => player.isActive === true).map((player) => {

        const teamImage = teamList.filter((team) => team.teamId === parseInt(player.teamId))[0];

        const handleRowClick = (player) => {
            history.push(`players/${parseInt(player.personId)}`);
        }

            return (
                <tr key={player.personId} className={style.tr} onClick={() => handleRowClick(player)}>
                    <td>{player.temporaryDisplayName}</td>
                    <td>
                        <img className={style.playerImage}
                             onError={(event) => playerDefaultImage(event)}
                             src={getPlayerImage(parseInt(player.personId))}
                             alt={player.temporaryDisplayName}
                             loading="lazy"
                        />
                    </td>
                    <td>{player.teamSitesOnly.posFull}</td>
                    <td>
                            <img className={style.teamLogoImage}
                                 src={getTeamImage(teamImage.teamName)}
                                 alt={"teamImage.teamName"}
                                 loading="lazy"
                            />
                    </td>
                </tr>
            )
    });

    return (
        <table className="table">
            <thead className={style.thead}>
                <tr>
                    <th>Name</th>
                    <th>Picture</th>
                    <th>Position</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody className={style.tbody}>
            {playerTr}
            </tbody>
        </table>
    )
}

export default PlayersTable;