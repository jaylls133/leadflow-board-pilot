
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'new' | 'contacted' | 'negotiation' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  notes: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: Status;
  title: string;
  leadIds: string[];
}

export interface Board {
  columns: {
    [key in Status]: Column;
  };
  leads: {
    [key: string]: Lead;
  };
}
