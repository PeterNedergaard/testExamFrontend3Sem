import React, {useEffect, useState} from 'react';
import apiFacade from "../apiFacade";
import {Link} from "react-router-dom";

const DeleteBoat = () => {

    const [boatList, setBoatList] = useState([]);
    const [selectedBoat, setSelectedBoat] = useState();

    useEffect(() => {

        const fetchBoats = async() => {
            const boats = await apiFacade.getAllBoats();

            setBoatList(boats);
        }

        fetchBoats();

    }, [])


    const clickHandler = (event) => {
        setSelectedBoat(event.target.value);
    }

    const btnHandler = () => {
        apiFacade.deleteBoat(selectedBoat);
    }


        return (
        <div>
            <h1>Delete a boat</h1>

            <div>
                <div className="harbourDropdownContainer">

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
                    <button onClick={btnHandler} className="btn btn-secondary">Delete boat</button>
                </div>


            </div>

        </div>
    );
};

export default DeleteBoat;
