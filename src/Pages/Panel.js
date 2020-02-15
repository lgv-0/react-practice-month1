import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import UserTab from '../Components/UsersTab';
import KeyTab from '../Components/KeysTab';
import InfoTab from '../Components/InfoTab';

function Panel(props)
{
    let [name, sName] = useState("");
    const { path } = useParams();

    useEffect(()=>{sName(props.cookies.get("name"))}, []);

    let getTab = () =>
    {
        switch (path)
        {
            case "users":
                return <UserTab cookies={props.cookies} />
            case "keys":
                return <KeyTab cookies={props.cookies} />
            case "info":
                return <InfoTab cookies={props.cookies} />
            default:
                return <h1>Not found</h1>;
        }
    }

    return (
        <PanelContainer>
            {props.cookies.get("msid") == null ? <Redirect to='/login' /> : null}
            <section className="sideBar">
                <img src={require("../Assets/logo.png")} alt="Logo" />
                <hr />
                <Link to="/panel/users"><div className="link">Users</div></Link>
                <Link to="/panel/keys"><div className="link">Keys</div></Link>
                <Link to="/panel/info"><div className="link">Cheat Info</div></Link>
                <div id="bottom">
                    <p>{name}, <a onClick={()=>{props.cookies.remove("msid"); sName("");}}>Logout</a></p>
                </div>
            </section>
            <section className="content">
                {getTab()}
            </section>
        </PanelContainer>
    );
}

let PanelContainer = styled.div`
    display: flex;

    .sideBar
    {
        border-right: 1px solid #3e3e3e;
        margin-left: 1px;
        height: 100%;
        width: 260px;

        img
        {
            margin-top: 12px;
            width: 226px;
        }

        hr
        {
            background-color: #3e3e3e;
        }

        a
        {
            color: white;
        }

        #bottom
        {
            position: absolute;
            text-align: center;
            width: 227.4px;
            bottom: 0;

            p
            {
                color: cyan;
            }
            
            a
            {
                color: red;
                user-select: none;
                cursor: pointer;
            }
        }

        .link
        {
            width: 100%;
            height: 80px;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: 0.4s all;

            &:hover
            {
                background-color: #484848;
            }
        }
    }

    .content
    {
        padding: 20px;
        width: 100%;
        height: 100%;
    }
`;

export default Panel;