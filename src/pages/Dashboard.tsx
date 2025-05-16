
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useLeadContext } from '@/context/LeadContext';
import BoardColumn from '@/components/BoardColumn';
import SearchFilter from '@/components/SearchFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from '@/components/LeadForm';
import { Lead, Priority, Status } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { board, updateBoardAfterDrag, addLead } = useLeadContext();
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  // Handle drag end event
  const onDragEnd = (result: any) => {
    updateBoardAfterDrag(result);
  };

  // Filter leads based on search query and filters
  const getFilteredLeadsForColumn = (columnId: Status) => {
    // If status filter is active and doesn't match this column, return empty
    if (statusFilter !== 'all' && statusFilter !== columnId) {
      return [];
    }

    const leadIds = board.columns[columnId].leadIds;
    
    return leadIds
      .map(leadId => board.leads[leadId])
      .filter(lead => {
        // Filter by priority if set
        if (priorityFilter !== 'all' && lead.priority !== priorityFilter) {
          return false;
        }
        
        // Filter by search query if set
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            lead.name.toLowerCase().includes(query) ||
            lead.company.toLowerCase().includes(query) ||
            lead.email.toLowerCase().includes(query)
          );
        }
        
        return true;
      });
  };

  // Handle adding a new lead
  const handleAddLead = (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    try {
      addLead(data);
      setIsAddDialogOpen(false);
      toast({
        title: "Lead added",
        description: `${data.name} has been added successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Lead Board</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>+ Add Lead</Button>
      </div>

      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilterStatus={setStatusFilter}
          onFilterPriority={setPriorityFilter}
          onClearFilters={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setPriorityFilter('all');
          }}
        />
      </div>

      <div className="overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex">
            {Object.values(board.columns).map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                leads={getFilteredLeadsForColumn(column.id)}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <LeadForm onSubmit={handleAddLead} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
