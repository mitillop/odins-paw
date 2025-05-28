"use client";

import React from "react";
import ReactSwapy from "react-swapy";
import PetManagement from "./PetManagement";
import PetInfo from "./PetInfo";
import PetPlan from "./PetPlan";
import DietsPanel from "./DietsPanel";
import ChatNutrition from "./ChatNutrition";
import ChatTips from "./ChatTips";
import ChatGeneral from "./ChatGeneral";
import { useRef, useEffect } from "react";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <ReactSwapy.Container className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReactSwapy.Slot id={0} className="lg:col-span-1">
          <ReactSwapy.Item className="h-full" name={"Pet Management"}>
            <PetManagement />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>
        <ReactSwapy.Slot id={1} className="lg:col-span-1">
          <ReactSwapy.Item className="h-full" name={"Pet Info"}>
            <PetInfo />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>
        <ReactSwapy.Slot id={2} className="lg:col-span-1">
          <ReactSwapy.Item className="h-full" name={"Pet Plan"}>
            <PetPlan />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>

        <div className="lg:col-span-3">
            <DietsPanel />
        </div>

        <ReactSwapy.Slot id={4} className="lg:col-span-1 ml-2">
          <ReactSwapy.Item className="h-full" name={"Chat General"}>
            <ChatGeneral />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>
        <ReactSwapy.Slot id={5} className="lg:col-span-1 ml-2">
          <ReactSwapy.Item className="h-full" name={"Chat Nutrition"}>
            <ChatNutrition />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>
        <ReactSwapy.Slot id={6} className="lg:col-span-1 ml-3">
          <ReactSwapy.Item className="h-full" name={"Chat Tips"}>
            <ChatTips />
          </ReactSwapy.Item>
        </ReactSwapy.Slot>
      </ReactSwapy.Container>
    </div>
  );
}

export default Dashboard;
