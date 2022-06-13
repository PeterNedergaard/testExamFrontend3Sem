import React, {useEffect, useState} from 'react';
import apiFacade from "../apiFacade";
import "../harbourBoats.css"

const HarbourBoats = props => {


    const [harbourList, setHarbourList] = useState([]);
    const [selected, setSelected] = useState("");
    const [boatList, setBoatList] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {

        const fetchHarbours = async() => {
            const harbours = await apiFacade.getAllHarbours();

            setHarbourList(harbours);
        }

        fetchHarbours();

    }, [])


    useEffect(() => {

        const fetchBoats = async() => {
            if (selected !== ""){
                const boats = await apiFacade.getBoatsByHarbour(selected);

                setBoatList(boats);
            }
        }

        fetchBoats();

    }, [reload])



    const clickHandler = (event) => {
        setSelected(event.target.value);
    }

    const btnHandler = () => {
        setReload(!reload);
    }


    return (
        <div>
            <h1>Boats by harbour</h1>

            <div className="harbourDropdownContainer">

                <div className="harbourDropdown">
                    <select onClick={clickHandler} name="harbours" id="harbours">

                        <option selected="true" disabled="disabled" value="">Choose a harbour:</option>

                        {harbourList.map((harbour, index) => {
                            return(
                                <option key={index} value={harbour.name}>{harbour.name}</option>
                            )
                        })}

                    </select>

                    <br/>

                    <button onClick={btnHandler} className="btn btn-secondary">Get boats</button>
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