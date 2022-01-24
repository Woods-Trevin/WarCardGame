import './scorepage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as playerDecks from '../../store/playerdecks'

function ScorePage() {
    const dispatch = useDispatch()

    const victories = useSelector(state => state.playerDecks?.victories)


    useEffect(async () => {
        await dispatch(playerDecks.getVictories())
    }, [dispatch])


    return (
        <div className="score_outmost_ctnr">
            <div className="score_box">
                <div className="score_title">
                    <li className="score_title_text">
                        Win Log
                    </li>
                </div>
                <div className="score_record_ctnr">
                    {
                        victories?.map(victory =>
                            <li className="winner_record">
                                {victory?.id}. {victory?.player}
                            </li>
                        )
                    }
                </div>

            </div>
        </div>
    );
};


export default ScorePage;
