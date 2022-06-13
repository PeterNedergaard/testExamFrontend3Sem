import React, {useEffect, useState} from 'react';
import "../harbourBoats.css";
import apiFacade from "../apiFacade";
import "../connectHarbourBoats.css";

const ConnectBoatHarbour = props => {

    const [harbourList, setHarbourList] = useState([]);
    const [boatList, setBoatList] = useState([]);
    const [selectedHarbour, setSelectedHarbour] = useState();
    const [selectedBoat, setSelectedBoat] = useState();


    useEffect(() => {

        const fetchHarbours = async() => {
            const harbours = await apiFacade.getAllHarbours();

            setHarbourList(harbours);
        }

        const fetchBoats = async() => {
            const boats = await apiFacade.getAllBoats();

            setBoatList(boats);
        }

        fetchHarbours();
        fetchBoats();

    }, [])


    const clickHandler = (event) => {

        if (event.target.id === "harbours"){
            setSelectedHarbour(event.target.value);
        } else {
            setSelectedBoat(event.target.value);
        }
    }

    const btnHandler = () => {
        console.log(selectedHarbour);
        console.log(selectedBoat);
        apiFacade.setHarbour(selectedBoat,selectedHarbour);
    }

    return (
        <div>
            <h1>Connect a boat with a harbour</h1>

            <div>
                <div className="harbourDropdownContainer">

                    <div className="harbourDropdown">
                        <select onClick={clickHandler} name="harbours" id="harbours">

                            <option selected="true" disabled="disabled">Choose a harbour:</option>

                            {harbourList.map((harbour, index) => {
                                return(
                                    <option key={index} value={harbour.name}>{harbour.name}</option>
                                )
                            })}

                        </select>
                    </div>

                    <div className="harbourDropdown">
                        <select onClick={clickHandler} name="boats" id="boats">

                            <option selected="true" disabled="disabled">Choose a boat:</option>

                            {boatList.map((boat, index) => {
                                return(
                                    <option key={index} value={boat.name}>{boat.name}</option>
                                )
                            })}

                        </select>
                    </div>

                </div>

                <div className="connectBtnContainer">
                    <button onClick={btnHandler} className="btn btn-secondary">Connect</button>
                </div>


            </div>

        </div>
    );
};


export default ConnectBoatHarbour;