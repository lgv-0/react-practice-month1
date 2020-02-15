import React, { useEffect, useState } from 'react';
import APICall from "./API";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

function CheatTable(props)
{
    const [CheatData, sCheatData] = useState([]);

    useEffect(() =>
    {
        props.title("Cheat Information");
        if (props.cookies.get("msid") != null && CheatData.length === 0)
            APICall({"req":"getcheats", "atk":props.cookies.get("msid")},
            (data)=>
            {
                let tmpKeys = JSON.parse(data.replace("},]", "}]"));
                sCheatData(tmpKeys);
            },
            (error)=>
            {
                console.log("error");
            })
    }, [CheatData.length]);

    return (
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Target</th>
                        <th>URL</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CheatData.map((i)=>
                        {
                            return (
                                <tr key={i.id}>
                                    <th scope="row">{i.id}</th>
                                    <th>{i.name}</th>
                                    <th>{i.version}</th>
                                    <th>{i.target}</th>
                                    <th>{i.url}</th>
                                    <th><Link to={`/panel/info/${i.id}`}>Modify {i.name}</Link></th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
    );
}

export default CheatTable;