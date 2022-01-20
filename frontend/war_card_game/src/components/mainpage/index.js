import "./mainpage.css";


function Mainpage() {

    return (
        <div className="outmost_ctnr">
            <div className="card_count_ctnr">
                <p className="player_one_count_label">
                    Player One Card Count:
                </p>
                <p className="player_two_count_label">
                    Player Two Card Count:
                </p>
            </div>
            <div className="cards_ctnr">
                <div className="card_ctnr--left">
                    <div className="player_one_card one" />
                    <div className="player_one_card two" />
                    <div className="player_one_card three" />
                    <div className="player_one_card four" />
                    <div className="player_one_card five" />
                    <div className="player_one_card six" />
                    <div className="player_one_card seven" />
                    <div className="player_one_card eight" />
                    <div className="player_one_card nine" />
                    <div className="player_one_card ten" />
                </div>
                <div className="card_ctnr--right">
                    <div className="player_two_card one" />
                    <div className="player_two_card two" />
                    <div className="player_two_card three" />
                    <div className="player_two_card four" />
                    <div className="player_two_card five" />
                    <div className="player_two_card six" />
                    <div className="player_two_card seven" />
                    <div className="player_two_card eight" />
                    <div className="player_two_card nine" />
                    <div className="player_two_card ten" />
                </div>
            </div>
            <div className="playing_field">
                <div className="pf--one">
                    <div className="playerOne_pf_card card-slot1">

                    </div>
                    <div className="playerOne_pf_card card-slot2">

                    </div>
                    <div className="playerOne_pf_card card-slot3">

                    </div>
                    <div className="playerOne_pf_card card-slot4">

                    </div>
                </div>
                <div className="pf--two">
                    <div className="playerTwo_pf_card card-slot1">

                    </div>
                    <div className="playerTwo_pf_card card-slot2">

                    </div>
                    <div className="playerTwo_pf_card card-slot3">

                    </div>
                    <div className="playerTwo_pf_card card-slot4">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;