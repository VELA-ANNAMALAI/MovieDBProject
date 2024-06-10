import React, { useState } from 'react';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/shadcn/shadcn/button';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="relative h-2 w-full left-36 top-0 md:left-24 " style={{ top: -37 }}>
      <Input
        className={`block text-black p-2.5 w-96 z-20 h-9 ml-20 ${showInput? 'block' : 'hidden md:block lg:block xl:block'}`}
        placeholder="Search Movies..."
        required
      />
      <Button
        variant="ghost"
        type="submit"
        className="absolute top-0 end-0 p-3 text-sm font-medium h-9 text-black bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setShowInput(true)}
      >
        <Search size={15} />
        <span className="sr-only text-white md:text-yellow-50">Search</span>
      </Button>
    </div>
  );
}