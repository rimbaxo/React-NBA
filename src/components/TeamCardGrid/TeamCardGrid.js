import React from "react";
import {getTeamImage} from "../../utility/utility";
import TeamCard from "../TeamCard/TeamCard";

function teamCardGrid(props){

    const {teamList, col} = props;

    const teamCol = teamList.map((team) => {
            return (
                <div className="col">
                    <TeamCard
                        number={team.teamId}
                        name1={team.location}
                        name2={team.simpleName}
                        teamImage={getTeamImage(team.teamName)}
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
            {teamCol}
        </div>
    )
}

export default teamCardGrid;