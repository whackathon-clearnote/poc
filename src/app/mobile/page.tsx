"use client";

import { useState } from "react";
import { InfoPage } from "./_sub/InfoPage";
import { MedicationsPage } from "./_sub/MedicationsPage";
import { InboxPage } from "./_sub/InboxPage";
import { BottomNav } from "./_sub/BottomNav";

export default function MobilePOC() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* iPhone frame */}
      <div className="relative bg-white rounded-[3rem] shadow-2xl border-8 border-black w-[350px] h-[700px] flex flex-col overflow-hidden">
        {/* Screen content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-sm text-gray-700 font-semibold text-center">
            You are viewing the records of: <br />
            <span className="font-bold">Tan Beng Seng</span>
          </h2>
          {activeTab === "info" && <InfoPage />}
          {activeTab === "medications" && <MedicationsPage />}
          {activeTab === "inbox" && <InboxPage />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
