import * as React from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";

const assignToOptions = [
    { value: "all", label: "All Students" },
    { value: "groupA", label: "Group A" },
    { value: "groupB", label: "Group B" },
];

const AsideSection = ({ type, channelName }) => {
    const { register, setValue, watch } = useFormContext();
    const { channel } = useContext(ChannelContext);
    const dueDate = watch("dueDate");
    const dueTime = watch("dueTime");
    const [pointsValue, setPointsValue] = React.useState("Ungraded");
    const [selectedAssignTo, setSelectedAssignTo] = React.useState("all");
    const [assignToOpen, setAssignToOpen] = React.useState(false);
    const [topics, setTopics] = useState(["No Topic"]); // Include "No Topic" by default

    // Ensure default values are set
    useEffect(() => {
        setValue("assignTo", "all");
        setValue("points", pointsValue);

        // Fetch topics dynamically from ChannelContext
        if (channel) {
            const fetchedTopics = channel.posts
                .filter((post) => post.type === "topic")
                .map((post) => post.name);
            setTopics(["No Topic", ...fetchedTopics]);
        }
    }, [setValue, pointsValue, channel]);

    const handlePointsChange = (value) => {
        if (value === "Ungraded" || /^\d+$/.test(value)) {
            setPointsValue(value);
            setValue("points", value);
        }
    };

    return (
        <div className="flex flex-col justify-between gap-10 relative">
            {/* Top Section */}
            <div className="space-y-6">
                {/* Channel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">For</label>
                    <div className="bg-gray-100 px-3 py-2 rounded border text-gray-600">
                        {channelName}
                    </div>
                </div>

                {/* Assign To */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                    <Popover open={assignToOpen} onOpenChange={setAssignToOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={assignToOpen}
                                className="w-full justify-between"
                            >
                                {assignToOptions.find((option) => option.value === selectedAssignTo)?.label || "Select..."}
                                <ChevronsUpDown className="ml-2 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search groups..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No group found.</CommandEmpty>
                                    <CommandGroup>
                                        {assignToOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={(value) => {
                                                    setSelectedAssignTo(value);
                                                    setValue("assignTo", value);
                                                    setAssignToOpen(false);
                                                }}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectedAssignTo === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Points */}
                {type !== "material" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                        <div className="flex items-center space-x-2">
                            <input
                                value={pointsValue}
                                onChange={(e) => handlePointsChange(e.target.value)}
                                placeholder="Enter points or select from options"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                list="points-options"
                            />
                            <datalist id="points-options">
                                <option value="Ungraded">Ungraded</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </datalist>
                        </div>
                    </div>
                )}

                {/* Due Date and Time */}
                {type !== "material" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-3 py-2 border rounded text-gray-700 focus:ring focus:ring-blue-500"
                                >
                                    {dueDate
                                        ? `${format(new Date(dueDate), "PP")} ${
                                            dueTime ? `at ${dueTime}` : ""
                                        }`
                                        : "Pick a date"}
                                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            {...register("dueDate")}
                                            type="date"
                                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Time (optional)
                                        </label>
                                        <input
                                            {...register("dueTime")}
                                            type="time"
                                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                {/* Topic */}
                <div>
                    <label className="block text-sm font-medium  mb-1">Topic</label>
                    <select
                        {...register("topic")}
                        className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                    >
                        {topics.map((topic, index) => (
                            <option key={index} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

AsideSection.propTypes = {
    type: PropTypes.string.isRequired,
    channelName: PropTypes.string.isRequired,
};

export default AsideSection;