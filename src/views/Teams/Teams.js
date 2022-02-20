import React, {useState} from "react"
import teamList from "../../assets/teams.json";
import style from "./Teams.Module.css"
import clsx from "clsx";
import TeamCardGrid from "../../components/TeamCardGrid/TeamCardGrid";
import TeamTable from "../../components/TeamTable/TeamTable";


function Teams() {

    const [displayGrid, setDisplayGrid] = useState("true");

    return (
        <div className="container">
            <div className="row justify-content-center mt-3">
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

            <div className="row justify-content-center mb-5 mt-3">
                <div className="col">

                    {
                        displayGrid ?
                        <TeamCardGrid
                                teamList={teamList}
                                col={{xs:1, sm:2, md:3, lg:4, xl:5}}
                            /> :
                            <TeamTable teamList={teamList}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default Teams;