
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLeadContext } from '@/context/LeadContext';
import { format } from 'date-fns';
import { Status, Priority } from '@/types';

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLead, deleteLead, updateLeadStatus, updateLeadPriority } = useLeadContext();
  
  const lead = getLead(id || '');
  
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4">Lead not found</h2>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${lead.name}?`)) {
      deleteLead(lead.id);
      navigate('/dashboard');
    }
  };

  const statusOptions: Status[] = ['new', 'contacted', 'negotiation', 'closed'];
  const priorityOptions: Priority[] = ['high', 'medium', 'low'];
  
  const priorityColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lead.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/edit-lead/${lead.id}`)}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                <div>{lead.email}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Phone</div>
                <div>{lead.phone}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Company</div>
                <div>{lead.company}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Source</div>
                <div>{lead.source}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Created</div>
                <div>{format(new Date(lead.createdAt), 'PPP')}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Last Updated</div>
                <div>{format(new Date(lead.updatedAt), 'PPP')}</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Notes</div>
              <div className="whitespace-pre-wrap">{lead.notes || 'No notes available'}</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={lead.status === status ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => updateLeadStatus(lead.id, status)}
                  >
                    <div className={`w-2 h-2 rounded-full status-${status} mr-2`} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {priorityOptions.map((priority) => (
                  <Button
                    key={priority}
                    variant={lead.priority === priority ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => updateLeadPriority(lead.id, priority)}
                  >
                    <div className={`w-2 h-2 rounded-full bg-priority-${priority} mr-2`} />
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
