import React from "react";

export default function authHeader() {
    const user = localStorage.getItem('userToken');

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
