"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Search for audio clips"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}