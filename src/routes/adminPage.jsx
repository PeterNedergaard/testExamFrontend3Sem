import React from 'react';
import ApiFacade from "../apiFacade";
import {Link} from "react-router-dom";

const AdminPage = () => {

        return (
            <div>
                {ApiFacade.getRoles() === "admin" ?
                    (<div>
                        <h1 className="title">Admin page</h1>

                        <div className="link-container">
                            <Link to="/createboat">Create boat</Link> |{" "}
                            <Link to="/connect">Connect boat with harbour</Link> |{" "}
                            <Link to="/deleteboat">Delete boat</Link>
                        </div>
                    </div>)
                    :
                    (<h1 className="title">You are not an admin</h1>)
                }
            </div>
        );
};


export default AdminPage;