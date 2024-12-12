import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdOutlineAssignment, MdOutlineBook, MdOutlineQuiz } from "react-icons/md";
import { FileQuestion } from "lucide-react";

import PropTypes from 'prop-types';

const CreateDropdown = ({ onOpenDialog }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default">Create</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border rounded shadow">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => onOpenDialog("assignment")}>
                        <MdOutlineAssignment className="mr-2" /> Assignment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpenDialog("quiz")}>
                        <MdOutlineQuiz className="mr-2" /> Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpenDialog("poll")}>
                        <FileQuestion className="mr-2" /> Question (Poll)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpenDialog("material")}>
                        <MdOutlineBook className="mr-2" /> Material
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => onOpenDialog("topic")}>
                        Topic
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

CreateDropdown.propTypes = {
    onOpenDialog: PropTypes.func.isRequired,
};

export default CreateDropdown;