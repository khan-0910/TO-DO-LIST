"use client"

import { useState, useEffect } from "react"
import { Plus, SaveIcon, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Column from "./Draggable/Column";
import Card from "./Draggable/Card";

export default function MainContent({ darkMode }) {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [newTask, setNewTask] = useState('');
    const [activeId, setActiveId] = useState(null);
    const [message, setMessage] = useState('');
    const [loadingTasks, setIsloadingTasks] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setMessage("Loading tasks...")
                const res = await fetch('api/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!res.ok) throw new Error("Failed to load tasks");
                const data = await res.json();
                setTasks(data.tasks);
                setMessage('');
                setIsloadingTasks(false);
            } catch (error) {
                console.error("Error loading tasks:", error);
                setMessage('Failed to load tasks');
                setIsloadingTasks(false);
            }
        }
        load();
    }, [])

    useEffect(() => {
        if(loadingTasks) return;
        const interval = setInterval(() => {
            handleSaveTask();
        }, 30000);
        return () => clearInterval(interval);
    }, [tasks, loadingTasks]);

    const addNewTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: uuidv4(),
            text: newTask,
        }
        setTasks(prevTasks => ({
            ...prevTasks,
            todo: [...(prevTasks.todo || []), task]
        }));
        setNewTask('');
    }

    const deleteTask = (id, category) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [category]: prevTasks[category].filter(task => task.id !== id)
        }));
    }

    const handleEdit = (id, category, newText) => {
        setTasks(prev => ({
            ...prev,
            [category]: prev[category].map(task =>
                task.id === id ? { ...task, text: newText } : task
            )
        }));
    };

    const handleSaveTask = async () => {
        try {
            setIsSaving(true);
            setMessage("Saving...")
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tasks })
            })
            if (!res.ok) throw new Error("Failed to save tasks")
            setMessage('Saved ✓');
            setTimeout(() => setMessage(''), 2000);
        } catch (error) {
            console.error("Error saving tasks:", error);
            setMessage('Save failed ✗');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setIsSaving(false);
        }
    }

    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;
        setActiveId(null);

        const sourceCat = Object.keys(tasks).find(key => tasks[key].some(task => task.id === active.id));
        let destinationCat = Object.keys(tasks).find(key => tasks[key].some(task => task.id === over.id));

        if (!destinationCat && Object.keys(tasks).includes(over.id)) {
            destinationCat = over.id;
        }

        if (!sourceCat || !destinationCat) return;

        if (sourceCat === destinationCat) {
            const sourceTasks = [...tasks[sourceCat]];
            const oldIdx = sourceTasks.findIndex(task => task.id === active.id);
            const newIdx = over.id === destinationCat ? sourceTasks.length : sourceTasks.findIndex(task => task.id === over.id);

            if (oldIdx !== newIdx && newIdx !== -1) {
                setTasks(prev => ({
                    ...prev,
                    [sourceCat]: arrayMove(prev[sourceCat], oldIdx, newIdx),
                }));
            }
        } else {
            const task = tasks[sourceCat].find(task => task.id === active.id);
            const destinationTasks = [...tasks[destinationCat]];
            const newIdx = over.id === destinationCat ? destinationTasks.length : destinationTasks.findIndex(task => task.id === over.id);

            setTasks(prev => ({
                ...prev,
                [sourceCat]: prev[sourceCat].filter(task => task.id !== active.id),
                [destinationCat]: newIdx === -1 ? [...prev[destinationCat], task] : [
                    ...prev[destinationCat].slice(0, newIdx),
                    task,
                    ...prev[destinationCat].slice(newIdx)
                ]
            }));
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const activeTask =
        Object.values(tasks).flat().find(task => task.id === activeId) || null;

    if (loadingTasks) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addNewTask();
                            }
                        }}
                        placeholder="What needs to be done?"
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={addNewTask}
                            disabled={!newTask.trim()}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Add Task</span>
                        </button>
                        <button
                            onClick={handleSaveTask}
                            disabled={isSaving}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            {isSaving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <SaveIcon className="w-5 h-5" />
                            )}
                            <span className="hidden sm:inline">Save</span>
                        </button>
                    </div>
                </div>
                {message && (
                    <div className="mt-3 text-center">
                        <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            message.includes('✓') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                            message.includes('✗') ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}>
                            {message}
                        </span>
                    </div>
                )}
            </div>
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {["todo", "inProgress", "done"].map((type) => (
                        tasks && tasks[type] && (
                            <SortableContext key={type} items={tasks[type].map((task) => task.id)} strategy={verticalListSortingStrategy}>
                                <Column tasks={tasks} type={type} onDelete={deleteTask} activeId={activeId} handleEdit={handleEdit} />
                            </SortableContext>
                        )
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <Card task={activeTask} onDelete={deleteTask} type="" />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
