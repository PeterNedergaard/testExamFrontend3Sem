import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import {Outlet, Link} from "react-router-dom";
import "./App.css";
import apiFacade from "./apiFacade";


function LogIn({login}) {

    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        // evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }



    return (

        <div className="container">
            <form className="login-container" onChange={onChange}>
                <h2 className="login-element login-text">Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp"
                           placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                </div>

                <Link to="/welcome">
                    <button className="btn btn-primary login-element" onClick={performLogin}>Login</button>
                </Link>

            </form>
        </div>
    )

}

function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")

    useEffect(() => {
        facade.fetchData().then(data => setDataFromServer(data.msg));
    }, [])

    return (
        <div className="header-info">

            <div className="nameAndRoleContainer">
                <h5>User: {facade.getName()}</h5>
                <h5>Role: {facade.getRoles()}</h5>
            </div>

            <div>

                <div className="link-container">

                    <button className="btn btn-light menuBtn firstMenuBtn">
                        <Link to="/welcome" style={{textDecoration: 'none', color:'black'}}>Welcome page</Link>
                    </button>

                    <button className="btn btn-light menuBtn">
                        <Link to="/userpage" style={{textDecoration: 'none', color:'black'}}>User page</Link>
                    </button>

                    <button className="btn btn-light menuBtn">
                        <Link to="/adminpage" style={{textDecoration: 'none', color:'black'}}>Admin page</Link>
                    </button>

                </div>

            </div>


        </div>
    )

}

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
    }

    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true));

    }


    useEffect(() => {

        if(apiFacade.loggedIn() === true){
            setLoggedIn(true);
        }

    }, [])


    return (
        <div>
            {!loggedIn ? (<LogIn login={login}/>) :
                (<div className="header">

                    <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem",}}>
                        <LoggedIn/>
                    </nav>

                    <button className="btn btn-danger" id="logout-btn" onClick={logout}>Logout</button>

                    {/*<nav*/}
                    {/*    style={{*/}
                    {/*        borderBottom: "solid 1px",*/}
                    {/*        paddingBottom: "1rem",*/}
                    {/*    }}*/}
                    {/*>*/}

                    {/*    <div className="link-container">*/}

                    {/*        <button className="btn btn-light menuBtn firstMenuBtn">*/}
                    {/*            <Link to="/welcome" style={{textDecoration: 'none', color:'black'}}>Welcome page</Link>*/}
                    {/*        </button>*/}

                    {/*        <button className="btn btn-light menuBtn">*/}
                    {/*            <Link to="/userpage" style={{textDecoration: 'none', color:'black'}}>User page</Link>*/}
                    {/*        </button>*/}

                    {/*        <button className="btn btn-light menuBtn">*/}
                    {/*            <Link to="/adminpage" style={{textDecoration: 'none', color:'black'}}>Admin page</Link>*/}
                    {/*        </button>*/}

                    {/*    </div>*/}

                    {/*</nav>*/}
                    <Outlet/>

                </div>)}
        </div>
    )

}

export default App;
