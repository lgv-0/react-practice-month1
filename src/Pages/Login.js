import React, { useState } from 'react';
import styled from "styled-components";
import { LoginForm } from '../Components/LoginForm';
import { Redirect } from 'react-router';

function Login(props)
{
    let [name, sName] = useState("");

    return (
        <LoginPage>
            {!props.cookies.get("msid") ? null : <Redirect to='/panel' />}
            <div id="container">
                <div id="placeholder">
                    {name}
                </div>
                <section id="Logo">
                    <img src={require("../Assets/logo.png")} alt="Logo" />
                </section>
                <hr />
                <section id="Body">
                    <div id="FormContainer">
                        <LoginForm cookies={props.cookies} fName={sName} />
                    </div>
                </section>
            </div>
        </LoginPage>
    );
}

const LoginPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    #container
    {
        width: 300px;

        img
        {
            width: 300px;
        }

        #placeholder
        {
            display: hidden;
        }
    }

    #FormContainer
    {
        display: flex;
        justify-content: center;
        align-items: center;

        form
        {
            width: 300px;

            label
            {
                width: 100%;
            }
        }
    }
`;

export default Login;