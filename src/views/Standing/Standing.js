import teamList from "../../assets/teams.json";
import StandingTable from "../../components/StandingTable/StandingTable";

function Standing() {

    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col">

                    <StandingTable teamList={teamList}>

                    </StandingTable>

                </div>
            </div>
        </div>
    );
}

export default Standing;