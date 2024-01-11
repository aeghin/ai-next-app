'use client'

import { useEffect } from "react";

import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('1590eaa3-d8cf-464f-8991-8898428ae716');
    }, []);

    return null
};