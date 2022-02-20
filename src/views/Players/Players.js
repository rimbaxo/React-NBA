import React from "react"
import {useState} from "react";
import PlayersTable from "../../components/PlayersTable/PlayersTable";
import PlayersCardGrid from "../../components/PlayersCardGrid/PlayersCardGrid";
import style from "./Players.module.css"
import clsx from "clsx";
import playersListData from "../../assets/players.json";


function Players() {

    const [displayGrid, setDisplayGrid] = useState("true");

    return (
        <div className="container">
            <div className="row justify-content-center mt-3 mb-3">
                <div className="col">

                    <div className={style.switch}>

                        <div className={clsx(style.option, {[style.active]: displayGrid})}
                             onClick={ () => setDisplayGrid(true)}>
                            Grid
                        </div>
                        <div className={clsx(style.option, {[style.active]: !displayGrid})}
                             onClick={ () => setDisplayGrid(false)}>
                            Table
                        </div>
                    </div>


                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col">

                    {
                        displayGrid ?
                        <PlayersCardGrid
                            playersList={playersListData}
                            col={{xs:1, sm:2, md:3, lg:4, xl:5}}
                        /> :
                        <PlayersTable playersList={playersListData}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Players;