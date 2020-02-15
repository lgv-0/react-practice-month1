import React, { useState, useEffect } from 'react';
import APICall from "./API";
import { Table, Button, Container, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import styled from "styled-components";

function KeyTab(props)
{
    const [KeyData, sKeyData] = useState([]);

    useEffect(() =>
    {
        if (props.cookies.get("msid") != null && KeyData.length === 0)
            APICall({"req":"getkeys", "atk":props.cookies.get("msid")},
            (data)=>
            {
                let tmpKeys = JSON.parse(data.replace("},]", "}]"));
                sKeyData(tmpKeys);
            },
            (error)=>
            {
                console.log("error");
            })
    }, [props, KeyData.length]);

    return (
        <Tab>
            <h1>Key Control</h1>
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Key</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        KeyData.map((i)=>
                        {
                            return (
                                <tr key={i.key}>
                                    <th scope="row">{i.id}</th>
                                    <th>{i.key}</th>
                                    <th>
                                    {i.id != 1 ? <Button color="warning" onClick={(e)=>HandleDeleteRequest(e, i, props.cookies, sKeyData)}>Delete</Button> : 
                                        <Button onClick={()=>{sKeyData([])}}>Refresh</Button>}
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <hr />
            <KeyForm cookies={props.cookies} setKeyData={sKeyData} />
        </Tab>
    );
}

let Tab = styled.div`
    padding: 30px;
    text-align: left;

    .keyCreate
    {
        margin-top: 80px;
        width: 500px;

        input
        {
            color: white;
        }
    }
`;

function makeid(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function KeyForm(props)
{
    let [textInput, sTextInput] = useState("");

    return (
        <Container className="keyCreate">
            <h3>Create Key</h3>
            <InputGroup>
                <Input onChange={(e)=>{sTextInput(e.target.value.replace(" ", ""))}} placeholder="Key" value={textInput} className="bg-dark" />
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={(e)=>{sTextInput(makeid(20))}}>Generate Random</Button>
                </InputGroupAddon>
            </InputGroup>
            <br />
            <InputGroup>
                <Button color="info" block onClick={(e)=>{if (textInput.length > 7) { HandleCreateRequest(e, props.cookies, textInput, props.setKeyData); sTextInput("Key");}}}>Create</Button>
            </InputGroup>
            <br />
        </Container>
    );
}

function HandleCreateRequest(e, cookies, key, fKeyData)
{
    APICall({"req":"createkey", "atk":cookies.get("msid"), "key":key},
        (data)=>
        {
            if (data === "x_Success")
                fKeyData([]);
        },
        ()=>
        {
            console.log("error");
        });
}

function HandleDeleteRequest(e, i, cookies, refresh)
{
    APICall({"req":"delkey", "atk":cookies.get("msid"), "key":i["key"]},
        (data)=>
        {
            if (data === "x_Success")
                refresh([]);
        },
        ()=>
        {
            console.log("error");
        });
}

export default KeyTab;