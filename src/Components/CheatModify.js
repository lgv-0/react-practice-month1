import React, { useEffect, useState } from 'react';
import APICall from "./API";
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm } from 'formik';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styled from "styled-components";
import { Redirect } from 'react-router';

function CheatModify(props)
{
    const ModifySchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(4, 'Too Short!')
                .max(16, 'Too Long!')
                .required('Required'),
            version: Yup.string()
                .min(3, 'Too Short!')
                .max(8, 'Too Long!')
                .required('Required'),
            target: Yup.string()
                .required('Required'),
            url: Yup.string()
                .required('Required')
        });
    
    let [formFinal, sFormFinal] = useState(null);

    let TargetID = props.id;

    let cb = (values, cookies, fTitle) =>
    {
        APICall({
            "req":"updcheat",
            "atk":cookies.get("msid"),
            "id":TargetID,
            "name":values.name,
            "version":values.version,
            "target":values.target,
            "url":values.url
            },
            (e)=>
                {
                    fTitle(<Redirect to="/panel/info" />);
                },
            ()=>
                {
                    console.log("error");
                }
            )
    }

    useEffect(() =>
    {
        if (props.cookies.get("msid") != null)
            APICall({"req":"getcheat", "atk":props.cookies.get("msid"), "id":TargetID},
            (data)=>
            {
                sFormFinal(
                <Formik initialValues={{name: data.name, version: data.version, target: data.target, url:data.url}} validationSchema={ModifySchema} onSubmit={(e)=>{cb(e, props.cookies, props.title)}}>
                    {({ errors, touched }) =>
                    (
                        <Form tag={FormikForm}>
                            <FormGroup>
                                <h2>Modifying #{data.id} {data.name}</h2>
                            </FormGroup>
                            <FormGroup>
                                    <Label>
                                        Name
                                        <Input tag={Field} type="name" name="name" id="name" placeholder="Name" bsSize="bg" className="bg-dark text-white" />
                                        {errors.name && touched.name ? (<div>{errors.name}</div>) : ""}
                                    </Label>
                            </FormGroup>
                            <FormGroup>
                                    <Label>
                                        Version
                                        <Input tag={Field} type="name" name="version" id="version" placeholder="Version" bsSize="bg" className="bg-dark text-white" />
                                        {errors.version && touched.version ? (<div>{errors.version}</div>) : ""}
                                    </Label>
                            </FormGroup>
                            <FormGroup>
                                    <Label>
                                        Target Process
                                        <Input tag={Field} type="name" name="target" id="target" placeholder="Target" bsSize="bg" className="bg-dark text-white" />
                                        {errors.target && touched.target ? (<div>{errors.target}</div>) : ""}
                                    </Label>
                            </FormGroup>
                            <FormGroup>
                                    <Label>
                                        URL
                                        <Input tag={Field} type="name" name="url" id="url" placeholder="URL" bsSize="bg" className="bg-dark text-white" />
                                        {errors.url && touched.url ? (<div>{errors.url}</div>) : ""}
                                    </Label>
                            </FormGroup>
                            <Button color="info" size="m" type="submit" block>Update</Button>
                        </Form>
                    )}
                </Formik>)
            },
            (error)=>
            {
                console.log("error");
            })
    }, []);

    return (
        <ModFormContainer>
            {formFinal}
        </ModFormContainer>
    );
}

let ModFormContainer = styled.div`
    width: 400px;

    label
    {
        width: 400px;
    }
`;

export default CheatModify;