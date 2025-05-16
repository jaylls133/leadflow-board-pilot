
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Lead, Priority } from '@/types';
import { useLeadContext } from '@/context/LeadContext';
import { Link } from 'react-router-dom';

interface LeadCardProps {
  lead: Lead;
  index: number;
}

const priorityColors = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low'
};

const LeadCard = ({ lead, index }: LeadCardProps) => {
  const { updateLeadPriority, deleteLead } = useLeadContext();

  const handlePriorityChange = (priority: Priority) => {
    updateLeadPriority(lead.id, priority);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${lead.name}?`)) {
      deleteLead(lead.id);
    }
  };

  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card className="lead-card">
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/lead/${lead.id}`} className="font-medium hover:text-primary">
                  {lead.name}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={`/lead/${lead.id}`} className="cursor-pointer">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/edit-lead/${lead.id}`} className="cursor-pointer">
                        Edit Lead
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handlePriorityChange('high')} className="cursor-pointer">
                      <div className="h-2 w-2 rounded-full bg-priority-high mr-2" />
                      High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePriorityChange('medium')} className="cursor-pointer">
                      <div className="h-2 w-2 rounded-full bg-priority-medium mr-2" />
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePriorityChange('low')} className="cursor-pointer">
                      <div className="h-2 w-2 rounded-full bg-priority-low mr-2" />
                      Low
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive">
                      Delete Lead
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                {lead.company}
              </div>
              
              <div className="text-sm mb-3 truncate">
                {lead.email}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`${priorityColors[lead.priority]} text-xs`}>
                  {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {new Date(lead.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default LeadCard;
