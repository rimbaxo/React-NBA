import React, {useEffect, useState} from "react"
import GameCardGrid from "../../components/GameCardGrid/GameCardGrid";
import {compareSecondColumn, getOneWeekAgoDate} from "../../utility/utility";

function Home(){

    const [gamesList, setGameList] = useState([]);
    const date = new Date();

    useEffect(() => {

        let isMounted = true;

        fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&start_date=${getOneWeekAgoDate(date.getDate(), date.getMonth()+1, date.getFullYear())}&end_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}&per_page=100`)
            .then(res => res.json())
            .then(res => {
                if(isMounted)
                    setGameList(res.data.map((game) => {
                        return [
                            game.date,
                            game.home_team.abbreviation,
                            game.home_team_score,
                            game.visitor_team.abbreviation,
                            game.visitor_team_score]
                    }));
                    console.log(gamesList);
            })
            .catch((error) => console.log("Error" + error));
        return () => {
            isMounted = false;
        }
    }, []);



    return (

        <div className="container">

            <div className="row mt-5">
                <div className="col">
                    <h1> Last week games:</h1>
                </div>
            </div>

            <div className="row justify-content-center mt-5 mb-5">
                <div className="col">
                    <GameCardGrid
                        gamesList={gamesList.sort(compareSecondColumn)}
                        col={{xs:1, sm:1, md:2, lg:2, xl:3}}
                    />
                </div>
            </div>
        </div>

    );
}

export default Home;