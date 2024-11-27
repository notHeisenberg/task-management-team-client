import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaFolderPlus } from "react-icons/fa";
import { LucideCircleFadingPlus } from "lucide-react";
import AddChannelModal from "@/components/modals/AddChannelModal";
import JoinChannelModal from "@/components/modals/JoinChannelModal";

const PopOver = () => {
  const [isAddChannelModalOpen, setAddChannelModalOpen] = useState(false);
  const [isJoinChannelModalOpen, setJoinChannelModalOpen] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" className='hover:border-dashed hover:border-current rounded-xl dark:bg-gray-200 dark:hover:bg-gray-200'>
                  <PlusIcon className="dark:text-black" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add/join channel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent className="w-36">
          <div className="flex flex-col">
            <Button variant="ghost" size="icon" title="Add channel" className='w-full text-xs'
              onClick={() => setAddChannelModalOpen(true)}
            >
              <FaFolderPlus className="mr-2" />
              Add channel
            </Button>
            <Button variant="ghost" size="icon" title="Join channel" className='w-full text-xs'
              onClick={() => setJoinChannelModalOpen(true)}
            >
              <LucideCircleFadingPlus className="mr-2" />
              Join channel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <AddChannelModal isOpen={isAddChannelModalOpen} onClose={() => setAddChannelModalOpen(false)} />
      <JoinChannelModal isOpen={isJoinChannelModalOpen} onClose={() => setJoinChannelModalOpen(false)} />
    </>
  );
};

export default PopOver;