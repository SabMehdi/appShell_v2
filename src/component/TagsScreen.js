// JavaScript (React)

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialExperiences = [
  {
    id: "1",
    title: "Experience 1",
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  },
  {
    id: "2",
    title: "Experience 2",
    skills: ["Skill 4", "Skill 5", "Skill 6"]
  }, {
    id: "3",
    title: "Experience 3",
    skills: ["Skill 7", "Skill 8", "Skill 9"]
  }, {
    id: "4",
    title: "Experience 4",
    skills: ["Skill 10", "Skill 11", "Skill 12"]
  }, {
    id: "5",
    title: "Experience 5",
    skills: ["Skill 13", "Skill 14", "Skill 15"]
  },
];

const ExperienceList = () => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [newSkill, setNewSkill] = useState({});

  const handleDeleteSkill = (experienceId, skillIndex) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === experienceId
          ? { ...exp, skills: exp.skills.filter((_, index) => index !== skillIndex) }
          : exp
      )
    );
  };

  const handleAddSkill = (experienceId) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === experienceId
          ? { ...exp, skills: [...exp.skills, newSkill[experienceId] || ""] }
          : exp
      )
    );
    setNewSkill({ ...newSkill, [experienceId]: "" });
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const startExperience = experiences.find((exp) => exp.id === source.droppableId);
    const endExperience = experiences.find((exp) => exp.id === destination.droppableId);

    const newStartSkills = Array.from(startExperience.skills);
    const [removed] = newStartSkills.splice(source.index, 1);

    if (startExperience === endExperience) {
      newStartSkills.splice(destination.index, 0, removed);
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === startExperience.id ? { ...exp, skills: newStartSkills } : exp))
      );
    } else {
      const newEndSkills = Array.from(endExperience.skills);
      newEndSkills.splice(destination.index, 0, removed);
      setExperiences((prev) =>
        prev.map((exp) => {
          if (exp.id === startExperience.id) return { ...exp, skills: newStartSkills };
          if (exp.id === endExperience.id) return { ...exp, skills: newEndSkills };
          return exp;
        })
      );
    }
  };
 
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-3 gap-4">
          {experiences.map((experience, index) => (
            <Droppable droppableId={experience.id} key={experience.id}>
              {(provided) => (
                <div
                  className="experience bg-gray-100 p-4 rounded-md"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="font-bold text-lg mb-2">{experience.title}</h2>
                  <div className="skills flex flex-wrap">
                    {experience.skills.map((skill, index) => (
                      <Draggable key={skill} draggableId={skill} index={index}>
                        {(provided) => (
                          <span
                            className="skill-tag bg-blue-500 text-white py-1 px-2 pr-8 mr-2 mb-2 rounded relative"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {skill}
                            <button
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                              onClick={() => handleDeleteSkill(experience.id, index)}
                            >
                              x
                            </button>
                          </span>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <div className="add-skill mt-2">
                    <input
                      type="text"
                      className="border-2 border-gray-300 rounded px-2 py-1 mr-2"
                      value={newSkill[experience.id] || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, [experience.id]: e.target.value })}
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAddSkill(experience.id)}
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default ExperienceList;