import React, {useEffect, useState} from 'react';
import apiFacade from "../apiFacade";
import "../harbourBoats.css"

const HarbourBoats = props => {


    const [harbourList, setHarbourList] = useState([]);
    const [selected, setSelected] = useState();
    const [boatList, setBoatList] = useState([]);


    useEffect(() => {

        const fetchHarbours = async() => {
            const harbours = await apiFacade.getAllHarbours();

            setHarbourList(harbours);
        }

        fetchHarbours();

    }, [])


    useEffect(() => {

        const fetchBoats = async() => {
            const boats = await apiFacade.getBoatsByHarbour(selected);

            setBoatList(boats);
        }

        fetchBoats();

        console.log(boatList);

    }, [selected])


    const clickHandler = (event) => {
        setSelected(event.target.value);
    }


    return (
        <div>
            <h1>Boats by harbour</h1>

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

            </div>

            <br/>
            <br/>

            <div className="table-container">
                <table className="table table-light table-striped table-style">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Make</th>
                        <th scope="col">Image</th>
                    </tr>
                    </thead>
                    <tbody>

                    {boatList.map((boat, index) => {

                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{boat.name}</td>
                                <td>{boat.brand}</td>
                                <td>{boat.make}</td>
                                <td>{boat.image}</td>
                            </tr>
                        )

                    })}

                    </tbody>
                </table>

            </div>



        </div>
    );
};


export default HarbourBoats;