import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TagList = ({ tags, setTags }) => {
  return (
    <Droppable droppableId="tagList">
      {(provided) => (
        <div
          className="tag-list bg-gray-100 p-4 rounded-md mb-4"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tags.map((tag, index) => (
            <Draggable key={tag} draggableId={tag} index={index}>
              {(provided) => (
                <span
                  className="tag bg-blue-500 text-white py-1 px-2 mr-2 mb-2 rounded"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {tag}
                </span>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TagList;