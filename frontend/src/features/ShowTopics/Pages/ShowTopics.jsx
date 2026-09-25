import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";

function ShowTopics() {
    const navigate = useNavigate();
    

    

    return (
        <div className="flex min-h-screen flex-col bg-[#eaf2fa] lg:flex-row">
            <Sidebar />
            <main className="flex-1 px-5 py-8 text-[#172b50] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-5xl">

                </div>
            </main>
        </div>
    );
}

export default ShowTopics;