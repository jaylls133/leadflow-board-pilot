
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority, Status } from '@/types';

interface SearchFilterProps {
  onSearch: (search: string) => void;
  onFilterStatus: (status: Status | 'all') => void;
  onFilterPriority: (priority: Priority | 'all') => void;
  onClearFilters: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilterStatus,
  onFilterPriority,
  onClearFilters
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleStatusChange = (value: string) => {
    const status = value as Status | 'all';
    setStatusFilter(status);
    onFilterStatus(status);
  };

  const handlePriorityChange = (value: string) => {
    const priority = value as Priority | 'all';
    setPriorityFilter(priority);
    onFilterPriority(priority);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    onClearFilters();
  };

  return (
    <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 items-end">
      <div className="w-full md:w-64">
        <Input
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <div className="w-full md:w-40">
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="negotiation">In Negotiation</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-40">
        <Select value={priorityFilter} onValueChange={handlePriorityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="secondary" onClick={handleSearch}>Search</Button>
      <Button variant="outline" onClick={handleClearFilters}>Clear</Button>
    </div>
  );
};

export default SearchFilter;
