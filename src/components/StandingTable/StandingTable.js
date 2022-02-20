import React from "react";
import {useEffect, useState} from "react";
import style from "./StandingTable.Module.css";
import {getTeamImage} from "../../utility/utility";
import {useHistory} from "react-router-dom";

function StandingTable(props){

    const {teamList} = props;
    const nba = require('nba.js').default;
    const [standings, setStandings] = useState([]);

    /*
    This Hook lets you access the history instance used by React Router. Using the history instance you can redirect users to
    another page. The history instance created by React Router uses a Stack( called “History Stack” ), that stores all
    the entries the user has visited.
    In this case i will use it to navigate from a table row to the team detail page.
    */
    const history = useHistory();

    useEffect(() => {

        let isMounted = true;

        nba.data.standings({
            date: "current"
        }).then(res => {
            if(isMounted)
                setStandings(res.league.standard.teams.map((team) => {
                    return [team.teamId, team.win, team.loss, team.winPct];
                }));
        }).catch(function (err) {
            console.error(err);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    const teamTr = standings.map((row, index) => {

        let teamImage = getTeamImage(teamList.filter((team) => parseInt(team.teamId) === parseInt(row[0]))[0].teamName);

        const handleRowClick = (row) => {
            history.push(`/teams/${parseInt(row[0])}`);
        }

        return (
                <tr key={row[0]} onClick={ () => handleRowClick(row)}>
                    <td>
                        {`${index+1} 
                          ${teamList.filter((team) => parseInt(team.teamId) === parseInt(row[0]))[0].location}
                          ${teamList.filter((team) => parseInt(team.teamId) === parseInt(row[0]))[0].simpleName}`}
                    </td>
                    <td>
                        <img
                            src={teamImage}
                            className={style.teamImage}
                            alt={teamList.filter((team) => parseInt(team.teamId) === parseInt(row[0]))[0].teamName}
                        />
                    </td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                </tr>
            )
        });

    return(
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead className={style.thead}>
                        <tr>
                            <th>Name</th>
                            <th>Logo</th>
                            <th>Win</th>
                            <th>Loss</th>
                            <th>Win %</th>
                        </tr>
                        </thead>
                        <tbody className={style.tbody}>
                        {teamTr}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StandingTable;