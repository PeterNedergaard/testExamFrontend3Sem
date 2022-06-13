import React, {useEffect, useState} from 'react';
import apiFacade from "../apiFacade";


const AllOwners = props => {

    const [ownerList, setOwnerList] = useState([]);


    useEffect(() => {

        const fetch = async() => {
            const allOwners = await apiFacade.getAllOwners();

            setOwnerList(allOwners);

            console.log(ownerList);
        }

        fetch();

    }, [])



    return (
        <div>
            <h1>All Owners</h1>

            <div className="table-container">
                <table className="table table-light table-striped table-style">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                    </tr>
                    </thead>
                    <tbody>

                    {ownerList.map((owner, index) => {

                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{owner.name}</td>
                                <td>{owner.address}</td>
                                <td>{owner.phone}</td>
                            </tr>
                        )

                    })}

                    </tbody>
                </table>

            </div>

        </div>
    );
};


export default AllOwners;