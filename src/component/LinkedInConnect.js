import React from "react";
import SmallButton from "../components/SmallButton";
const experiences = [
  {
    id: 1,
    title: "Experience 1",
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  },
  {
    id: 2,
    title: "Experience 2",
    skills: ["Skill 4", "Skill 5", "Skill 6"]
  },
  // Add more experiences as needed
];
const LinkedInConnect = () => (
  
  <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start mb-10">
        <div>
          <h1 className="text-2xl">Connect your LinkedIn</h1>
        </div>
      </div>
      <div className="flex justify-between mb-10">
        <div className="relative bg-gray-300 rounded-lg p-4">
          <img src="https://placehold.co/350x350" className="mb-4"></img>
        </div>
        <div className="w-10"></div>
        <div className="relative bg-gray-300 rounded-lg p-4">
          <img src="https://placehold.co/350x350" className="mb-4"></img>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <SmallButton label="Button 1" onClick={() => console.log("Button 1 Action")} />
        </div>
        <div>
          <SmallButton label="Button 2" onClick={() => console.log("Button 2 Action")} />
        </div>
      </div>
    </div>
  </div>
);

export default LinkedInConnect;
