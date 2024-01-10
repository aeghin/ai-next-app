'use client'

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface SubButtonProps {
    isPro: boolean
};

export const SubButton = ({ isPro = false }: SubButtonProps) => {

    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;

        } catch (error) {
            console.log("billing error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick} >
            {isPro ? "Manage subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
};

