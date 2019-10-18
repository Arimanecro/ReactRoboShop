import React from "react";

export default () => {

    let style = `body {text-align: center;background: #faf065;}
    h1 {font-family: 'Unlock'; font-size: 40px;line-height: 55px;}
    .error{
        display:flex;
        width: 50%;
        height: 100vh;
        margin: 0 auto;
        background: url("/img/robo_404.svg") no-repeat;
    }`;
    return (
        <>
            <head>
                <link rel="shortcut icon" href="./public/img/favicon.ico" type="image/x-icon" />
                <link href="https://fonts.googleapis.com/css?family=Unlock" rel="stylesheet" />
                <style>
                    {style}
                </style>
                <title>Error</title>
            </head>
            <h1>Oops, something wrong happened!</h1>
            <div className="error"></div>
        </>
    )
}