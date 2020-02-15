import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from "styled-components";
import CheatTable from './CheatTable';
import CheatModify from './CheatModify';

function InfoTab(props)
{
    let { id } = useParams();

    let [title, sTitle] = useState("Cheat Information");

    return (
        <Tab>
            <h1>{title}</h1>
            { id == null ?
                <CheatTable cookies={props.cookies} title={sTitle} /> :
                <CheatModify cookies={props.cookies} id={id} title={sTitle} />
            }
        </Tab>
    );
}

let Tab = styled.div`
    padding: 30px;
    text-align: left;
`;

export default InfoTab;