import URL from "./settings";
import jwt from 'jwt-decode'

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function apiFacade() {


    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }
    const getRoles = () => {
        return jwt(getToken()).roles;
    }
    const getName = () => {
        return jwt(getToken()).username;
    }


    const getJokes = async() => {

        return await fetch(URL + "/api/info/jokes")
            .then(handleHttpErrors)
            // .then(res => ())
    }


    const getAllOwners = async() => {

        return await fetch(URL + "/api/info/owners")
            .then(handleHttpErrors)
    }


    const getAllHarbours = async() => {

        return await fetch(URL + "/api/info/harbours")
            .then(handleHttpErrors)
    }


    const getAllBoats = async() => {

        return await fetch(URL + "/api/info/allboats")
            .then(handleHttpErrors)
    }


    const getBoatsByHarbour = async(harbourName) => {

        return await fetch(URL + "/api/info/boats/" + harbourName)
            .then(handleHttpErrors)
    }


    const createBoat = async(boatName,boatBrand,boatMake,boatImage) => {
        const options = makeOptions("POST", false,{brand: boatBrand, make: boatMake,
                                                                        name: boatName, image: boatImage});
        return fetch(URL + "/api/info/createboat", options)
    }


    const setHarbour = async(boatName, harbourName) => {
        const options = makeOptions("POST", false,{boatName: boatName, harbourName: harbourName});

        return fetch(URL + "/api/info/setharbour", options)
    }


    const deleteBoat = async(boatName) => {
        const options = makeOptions("POST", false,{boatName: boatName});

        return fetch(URL + "/api/info/deleteboat", options)
    }


    const login = (user, password) => {
        const options = makeOptions("POST", true,{username: user, password: password });
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {setToken(res.token) })
    }

    const fetchData = () => {
        const options = makeOptions("GET",true); //True add's the token

        if (getRoles() === "user"){
            return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
        } else if(getRoles() === "admin") {
            return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
        }

    }

    const makeOptions= (method,addToken,body) =>{
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }


    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getRoles,
        getJokes,
        getName,
        getAllOwners,
        getAllHarbours,
        getBoatsByHarbour,
        createBoat,
        getAllBoats,
        setHarbour,
        deleteBoat
    }
}





const facade = apiFacade();
export default facade;
