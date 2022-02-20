import React from "react"
import {getTeamImage} from "../../utility/utility";
import style from "./TeamTable.Module.css";
import {useHistory} from "react-router-dom";

function TeamTable(props){

    const {teamList} = props;

    const history = useHistory();

    const teamTr = teamList.map((team) => {

        const handleRowClick = (team) => {
            history.push(`teams/${parseInt(team.teamId)}`);
        }

        return (
            <tr key={team.teamId} className={style.tr} onClick={() => handleRowClick(team)}>
                <td>
                    <img className={style.teamImage}
                         src={getTeamImage(team.teamName)}
                         alt={team.teamName}
                         loading="lazy"
                    />
                </td>
                <td>{team.location} {team.simpleName}</td>
            </tr>
        )
    });

    return (
        <table className="table">
            <thead className={style.thead}>
            <tr>
                <th>Logo</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody className={style.tbody}>
            {teamTr}
            </tbody>
        </table>
    )
}
export default TeamTable;