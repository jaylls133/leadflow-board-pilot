
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import LeadCard from './LeadCard';
import { Column as ColumnType, Lead } from '@/types';

interface BoardColumnProps {
  column: ColumnType;
  leads: Lead[];
}

const statusColors = {
  new: 'status-new',
  contacted: 'status-contacted',
  negotiation: 'status-negotiation',
  closed: 'status-closed',
};

const BoardColumn = ({ column, leads }: BoardColumnProps) => {
  return (
    <div className="w-80 flex-shrink-0 mr-4">
      <div className="mb-3 flex items-center">
        <div className={`w-3 h-3 rounded-full ${statusColors[column.id]} mr-2`} />
        <h3 className="font-medium">{column.title}</h3>
        <span className="ml-2 text-muted-foreground text-sm">
          ({leads.length})
        </span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="board-column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {leads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
