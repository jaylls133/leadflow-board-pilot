
import React, { createContext, useContext, useState } from 'react';
import { initialData } from '../data/mockData';
import { Board, Lead, Status, Priority } from '../types';
import { toast } from 'sonner';
import { useToast } from '../hooks/use-toast';

interface LeadContextType {
  board: Board;
  updateBoardAfterDrag: (result: any) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLead: (lead: Lead) => void;
  deleteLead: (id: string) => void;
  getLead: (id: string) => Lead | undefined;
  updateLeadStatus: (leadId: string, newStatus: Status) => void;
  updateLeadPriority: (leadId: string, newPriority: Priority) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<Board>(initialData);
  const { toast } = useToast();

  const updateBoardAfterDrag = (result: any) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Getting the source and destination columns
    const sourceColumn = board.columns[source.droppableId as Status];
    const destColumn = board.columns[destination.droppableId as Status];

    // If dragging within the same column
    if (sourceColumn === destColumn) {
      const newLeadIds = [...sourceColumn.leadIds];
      // Remove the draggableId from its original position
      newLeadIds.splice(source.index, 1);
      // Insert the draggableId at the new position
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        leadIds: newLeadIds,
      };

      // Update the board state with the new column
      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));

      return;
    }

    // If dragging to a different column
    const sourceLeadIds = [...sourceColumn.leadIds];
    sourceLeadIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      leadIds: sourceLeadIds,
    };

    const destLeadIds = [...destColumn.leadIds];
    destLeadIds.splice(destination.index, 0, draggableId);
    const newDestColumn = {
      ...destColumn,
      leadIds: destLeadIds,
    };

    // Update lead status when moved to a different column
    const updatedLead = {
      ...board.leads[draggableId],
      status: destination.droppableId as Status,
      updatedAt: new Date().toISOString(),
    };

    // Update the board state with the new columns and updated lead
    setBoard((prev) => ({
      columns: {
        ...prev.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestColumn.id]: newDestColumn,
      },
      leads: {
        ...prev.leads,
        [draggableId]: updatedLead,
      },
    }));

    toast({
      title: "Lead status updated",
      description: `${board.leads[draggableId].name} moved to ${destColumn.title}`,
    });
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add the new lead to the appropriate status column
    const status = leadData.status;
    const column = board.columns[status];
    const newLeadIds = [...column.leadIds, id];

    setBoard((prev) => ({
      columns: {
        ...prev.columns,
        [status]: {
          ...prev.columns[status],
          leadIds: newLeadIds,
        },
      },
      leads: {
        ...prev.leads,
        [id]: newLead,
      },
    }));

    toast({
      title: "Lead added",
      description: `${newLead.name} has been added to ${column.title}`,
    });

    return id;
  };

  const updateLead = (updatedLead: Lead) => {
    const oldLead = board.leads[updatedLead.id];
    const newLead = {
      ...updatedLead,
      updatedAt: new Date().toISOString(),
    };

    // If status changed, update columns
    if (oldLead.status !== updatedLead.status) {
      // Remove from old status column
      const oldColumn = board.columns[oldLead.status];
      const newOldColumnLeadIds = oldColumn.leadIds.filter(id => id !== updatedLead.id);

      // Add to new status column
      const newColumn = board.columns[updatedLead.status];
      const newNewColumnLeadIds = [...newColumn.leadIds, updatedLead.id];

      setBoard((prev) => ({
        columns: {
          ...prev.columns,
          [oldLead.status]: {
            ...oldColumn,
            leadIds: newOldColumnLeadIds,
          },
          [updatedLead.status]: {
            ...newColumn,
            leadIds: newNewColumnLeadIds,
          },
        },
        leads: {
          ...prev.leads,
          [updatedLead.id]: newLead,
        },
      }));
    } else {
      // Just update the lead
      setBoard((prev) => ({
        ...prev,
        leads: {
          ...prev.leads,
          [updatedLead.id]: newLead,
        },
      }));
    }

    toast({
      title: "Lead updated",
      description: `${updatedLead.name} has been updated`,
    });
  };

  const deleteLead = (id: string) => {
    const leadToDelete = board.leads[id];
    if (!leadToDelete) return;

    const column = board.columns[leadToDelete.status];
    const newLeadIds = column.leadIds.filter(leadId => leadId !== id);

    const { [id]: _, ...newLeads } = board.leads;

    setBoard((prev) => ({
      columns: {
        ...prev.columns,
        [leadToDelete.status]: {
          ...column,
          leadIds: newLeadIds,
        },
      },
      leads: newLeads,
    }));

    toast({
      title: "Lead deleted",
      description: `${leadToDelete.name} has been removed`,
    });
  };

  const getLead = (id: string) => {
    return board.leads[id];
  };

  const updateLeadStatus = (leadId: string, newStatus: Status) => {
    const lead = board.leads[leadId];
    if (!lead) return;

    const oldStatus = lead.status;
    if (oldStatus === newStatus) return;

    const oldColumn = board.columns[oldStatus];
    const newColumn = board.columns[newStatus];

    const newOldColumnLeadIds = oldColumn.leadIds.filter(id => id !== leadId);
    const newNewColumnLeadIds = [...newColumn.leadIds, leadId];

    const updatedLead = {
      ...lead,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    setBoard((prev) => ({
      columns: {
        ...prev.columns,
        [oldStatus]: {
          ...oldColumn,
          leadIds: newOldColumnLeadIds,
        },
        [newStatus]: {
          ...newColumn,
          leadIds: newNewColumnLeadIds,
        },
      },
      leads: {
        ...prev.leads,
        [leadId]: updatedLead,
      },
    }));

    toast({
      title: "Status updated",
      description: `${lead.name} moved to ${newColumn.title}`,
    });
  };

  const updateLeadPriority = (leadId: string, newPriority: Priority) => {
    const lead = board.leads[leadId];
    if (!lead) return;

    const updatedLead = {
      ...lead,
      priority: newPriority,
      updatedAt: new Date().toISOString(),
    };

    setBoard((prev) => ({
      ...prev,
      leads: {
        ...prev.leads,
        [leadId]: updatedLead,
      },
    }));

    toast({
      title: "Priority updated",
      description: `${lead.name} priority set to ${newPriority}`,
    });
  };

  return (
    <LeadContext.Provider
      value={{
        board,
        updateBoardAfterDrag,
        addLead,
        updateLead,
        deleteLead,
        getLead,
        updateLeadStatus,
        updateLeadPriority,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadContext = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeadContext must be used within a LeadProvider');
  }
  return context;
};
