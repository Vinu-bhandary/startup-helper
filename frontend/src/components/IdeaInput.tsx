
import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const IdeaInput = () => {
  const [idea, setIdea] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      console.log('Idea submitted:', idea);
      setIdea('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-2xl relative transition-all duration-300 glass-morphism",
        isFocused ? "ring-1 ring-udbhava-purple/50" : ""
      )}
    >
      <input
        type="text"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your idea here"
        className="w-full px-4 py-3 bg-transparent text-white outline-none rounded-md"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-udbhava-purple text-white hover:bg-udbhava-purple/90 rounded-md"
        disabled={!idea.trim()}
      >
        <SendHorizontal size={18} />
      </Button>
    </form>
  );
};

export default IdeaInput;
