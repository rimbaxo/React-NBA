import React from "react"
import GameCard from "../GameCard/GameCard";

function GameCardGrid(props){

    const {gamesList, col} = props;

    const gameCardsCol = gamesList.map((game) => {

        return (
            <div className="col">

                <GameCard
                    date={game[0]}
                    home_team={game[1]}
                    home_team_score={game[2]}
                    visitor_team={game[3]}
                    visitor_team_score={game[4]}
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
            {gameCardsCol}
        </div>
    )
}

export default GameCardGrid;