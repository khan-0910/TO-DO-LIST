import { X, Grip, PencilIcon, Check } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";

export default function Card({ task, onDelete, type, handleEdit }) {
    const inputRef = useRef(null);
    const typeColors = {
        todo: "border-blue-300 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800/50",
        inProgress: "border-yellow-300 dark:border-yellow-600 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800/50",
        done: "border-green-300 dark:border-green-600 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50",
    };

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const [isEditing, setisEditing] = useState(false);
    const [editVal, setEditVal] = useState(task.text);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!editVal.trim()) return;
        handleEdit(task.id, type, editVal);
        setisEditing(false);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            key={task.id}
            className="mb-3"
        >
            <div
                className={`flex items-center justify-between w-full border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${typeColors[type]} ${isDragging ? 'scale-105 shadow-lg' : ''}`}>
                <div className="p-4 rounded-lg flex items-center hover:cursor-move flex-1 min-w-0">
                    <Grip className="inline-block mr-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    {isEditing ? (
                        <input
                            type="text"
                            value={editVal}
                            onChange={(e) => setEditVal(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') {
                                    setEditVal(task.text);
                                    setisEditing(false);
                                }
                            }}
                            className="flex-1 p-2 rounded-lg border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={inputRef}
                        />
                    ) : (
                        <span className="text-gray-800 dark:text-gray-200 break-words">{task.text}</span>
                    )}
                </div>
                <div className="flex items-center gap-1 pr-2">
                    {isEditing ? (
                        <button 
                            onClick={() => handleSave(task.id, type)} 
                            onPointerDown={(e) => e.stopPropagation()} 
                            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200 group"
                            title="Save"
                        >
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                        </button>
                    ) : (
                        <button 
                            onClick={() => setisEditing(true)} 
                            onPointerDown={(e) => e.stopPropagation()} 
                            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 group"
                            title="Edit"
                        >
                            <PencilIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (isEditing) {
                                setEditVal(task.text);
                                setisEditing(false);
                            } else {
                                onDelete(task.id, type);
                            }
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 group"
                        title={isEditing ? "Cancel" : "Delete"}
                    >
                        <X className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
