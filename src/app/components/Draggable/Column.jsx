import Card from "./Card";
import Droppable from "./Droppable";
import { ListTodo, Clock, CheckCircle2 } from "lucide-react";

export default function Column({ tasks, type, onDelete, handleEdit }) {
    const columnConfig = {
        todo: {
            title: 'To Do',
            icon: ListTodo,
            gradient: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/10',
            borderColor: 'border-blue-200 dark:border-blue-800'
        },
        inProgress: {
            title: 'In Progress',
            icon: Clock,
            gradient: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
            borderColor: 'border-yellow-200 dark:border-yellow-800'
        },
        done: {
            title: 'Done',
            icon: CheckCircle2,
            gradient: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/10',
            borderColor: 'border-green-200 dark:border-green-800'
        }
    };

    const config = columnConfig[type];
    const Icon = config.icon;
    const taskCount = tasks && tasks[type] ? tasks[type].length : 0;

    return (
        <Droppable id={type}>
            <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300 shadow-sm hover:shadow-md h-full`}>
                <div className={`bg-gradient-to-r ${config.gradient} text-white px-4 py-3 rounded-t-lg flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <h2 className="font-semibold text-lg">{config.title}</h2>
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {taskCount}
                    </span>
                </div>
                <div className="p-4 min-h-[200px]">
                    {tasks && tasks[type] && tasks[type].length > 0 ? (
                        tasks[type].map((task) => (
                            <Card key={task.id} task={task} onDelete={onDelete} type={type} handleEdit={handleEdit} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-600">
                            <Icon className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">No tasks yet</p>
                        </div>
                    )}
                </div>
            </div>
        </Droppable>
    );
}
