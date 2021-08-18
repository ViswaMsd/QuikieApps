import React, { useState } from "react";
import heroCards from "../assets/data.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useLocation } from "react-router-dom";
const hero_cards = heroCards[0].hero_cards;

const HeroCards = () => {
  const [characters, updateCharacters] = useState(hero_cards);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters" direction="horizontal">
        {(provided) => (
          <div
            // style={{ display: `${location.pathname === "/saved-detials" ? "none" : "flex"}` }}
            className="hero_cards_container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {characters.map((hero, index) => (
              <Draggable key={hero.name} draggableId={hero.name} index={index}>
                {(provided) => (
                  <div
                    className="hero_card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="top_block">
                      <p>{hero.name}</p>
                      <img src={hero.logo} alt={hero.logo} />
                    </div>
                    <div className="bottom_block">{hero.stock_value}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default HeroCards;
