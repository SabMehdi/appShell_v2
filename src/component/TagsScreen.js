// JavaScript (React)

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [newSkill, setNewSkill] = useState({});
  const [data, setData] = useState({ userId: '', facts: [] });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8060/api/all')
      .then(response => response.json())
      .then(data => {
        console.log(data[0]);
        const experiences = data[0].facts.map(fact => ({
          ...fact,
          title: fact.factTitle,
          linkedSkills: fact.linkedSkills ? fact.linkedSkills.map(skill => skill.skillName) : []
        }));
        setData({ userId: data[0].userId, facts: experiences });
        setExperiences(experiences);
        console.log(experiences);
      })
      .catch(error => {
        console.error('Error:', error);
        setExperiences([]);
      });
  }, []);

  const handleDeleteSkill = (experienceId, skillIndex) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === experienceId
          ? { ...exp, linkedSkills: exp.linkedSkills.filter((_, index) => index !== skillIndex) }
          : exp
      )
    );
    setIsModified(true);
  };

  const handleAddSkill = (experienceId) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === experienceId
          ? { ...exp, linkedSkills: [...exp.linkedSkills, newSkill[experienceId] || ""] }
          : exp
      )
    );
    setNewSkill({ ...newSkill, [experienceId]: "" });
    setIsModified(true);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const startExperience = experiences.find((exp) => exp.id === source.droppableId);
    const endExperience = experiences.find((exp) => exp.id === destination.droppableId);

    const newStartSkills = Array.from(startExperience.linkedSkills);
    const [removed] = newStartSkills.splice(source.index, 1);

    if (startExperience === endExperience) {
      newStartSkills.splice(destination.index, 0, removed);
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === startExperience.id ? { ...exp, linkedSkills: newStartSkills } : exp))
      );
    } else {
      const newEndSkills = Array.from(endExperience.linkedSkills);
      newEndSkills.splice(destination.index, 0, removed);
      setExperiences((prev) =>
        prev.map((exp) => {
          if (exp.id === startExperience.id) return { ...exp, linkedSkills: newStartSkills };
          if (exp.id === endExperience.id) return { ...exp, linkedSkills: newEndSkills };
          return exp;
        })
      );
    }
  };

  const handleSubmit = () => {
    if (!isModified) return;
  
    const transformedExperiences = experiences.map(exp => ({
      ...exp,
      linkedSkills: exp.linkedSkills.map(skillName => ({ skillName }))
    }));
  
    const dataToSend = {
      facts: transformedExperiences,
      userId: data.userId
    };
  
    console.log(dataToSend);
    fetch('http://localhost:8060/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  
    setIsModified(false);
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
                    {experience.linkedSkills.map((skill, index) => (
                      <Draggable key={`${experience.id}-${index}`} draggableId={`${experience.id}-${index}`} index={index}>
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
        {isModified && 
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
}
      </div>

    </DragDropContext>
  );
};

export default ExperienceList;