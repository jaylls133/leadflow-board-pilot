
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeadContext } from '@/context/LeadContext';
import LeadForm from '@/components/LeadForm';
import { useToast } from '@/hooks/use-toast';

const EditLead = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLead, updateLead } = useLeadContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const lead = getLead(id || '');

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4">Lead not found</h2>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    setIsLoading(true);
    
    try {
      updateLead({
        ...lead,
        ...data,
      });
      
      toast({
        title: "Lead updated",
        description: `${data.name} has been updated successfully`,
      });
      
      navigate(`/lead/${lead.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Lead</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit {lead.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm
            initialData={lead}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLead;
