import React from 'react'
import { Button } from "@/components/shadcn/shadcn/button"
import { Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
 
  DropdownMenuLabel,
  
  DropdownMenuSeparator,
  
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"


function Categories() {
  return (
    <div className='m-0 '>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='h-9 w-74 text-black text-lg '>All Categories<ChevronDown size={20} className='relative mt-1'/>
</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-black">
        <DropdownMenuLabel className='text-lg text-white'>Genres</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <div className='relative left-2 grid grid-cols-3 gap-2'>
        <Link to="/movies/action">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Action</span>
        </Link>
        <Link to="/movies/adventure">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Adventure</span>
        </Link>         
        <Link to="/movies/fantasy">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Fantasy</span>
        </Link> 
        <Link to="/movies/sci_fi">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Sci-Fi</span>
        </Link> 
        <Link to="/movies/horror">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Horror</span>
        </Link> 
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuLabel className='text-lg text-white'>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <div className='relative left-2 grid grid-cols-3 gap-2'>
        <Link to="/movies/english">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">English</span>
        </Link>
        <Link to="/movies/hindi">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Hindi</span>
        </Link>         
        <Link to="/movies/tamil">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Tamil</span>
        </Link> 
        <Link to="/movies/telugu">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Telugu</span>
        </Link> 
        <Link to="/movies/malayalam">
          <span className="relative text-base cursor-pointer text-white font-medium hover:underline underline-offset-4">Malyalam</span>
        </Link> 
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
</div>
  )
}


export default Categories