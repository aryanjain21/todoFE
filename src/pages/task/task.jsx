import { useEffect, useState } from 'react';
import './task.scss';
import ToDo from '../../common/add-task/to-do';
import UpcomingTask from '../../common/upcoming-task/upcoming-task';
import { useTask } from '../../context/taskContext';
import { getTaskList, deleteTask, updateTask } from '../../services/api';
import { toast } from 'react-toastify';

const Task = () => {

    const { taskDispatch, contextTask } = useTask();
    const [task, setTask] = useState('');
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        async function fetchData() {
            try {
                const list = await getTaskList();
                if (list.data.status === 200) {
                    toast.success(list.data.message);
                    // setLoader(false);
                    let taskList = list.data.data;
                    taskDispatch({ type: 'GET_TASK', payload: taskList });
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleEdit = (item) => {
        setTask(item.task);
        setEditId(item._id);
        setDate(new Date(item.date));
        setEdit(prevState => !prevState);
    }

    const handleDelete = async (id) => {
        try {
            const deletedTask = await deleteTask({taskId: id});
            if (deletedTask.data.status === 200) {
                toast.success(deletedTask.data.message);
                // setLoader(false);
                let task = deletedTask.data.data;
                taskDispatch({ type: 'DELETE', payload: task });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const taskCompleted = async (task) => {
        let data = {
            taskId: task._id,
            completed: !task.completed
        }
        try {
            let updatedTask = await updateTask(data);
            if (updatedTask.data.status === 200) {
                toast.success(updatedTask.data.message);
                taskDispatch({ type: 'UPDATE_TASK', payload: updatedTask.data.data });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='task_container'>
            <div className='to_do_section'>
                <ToDo task={task} setTask={setTask} date={date} setDate={setDate} edit={edit} setEdit={setEdit} editId={editId} handleEdit={handleEdit} handleDelete={handleDelete} taskCompleted={taskCompleted} />
            </div>
            <div className='upcoming_task_section'>
                <UpcomingTask list={contextTask.tasks} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Task;