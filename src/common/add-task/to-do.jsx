import { useEffect, useState } from 'react';
import './to-do.scss';
import Edit from '../../assets/icon/edit.svg';
import Delete from '../../assets/icon/delete.svg';
import Checked from '../../assets/icon/checked.svg';
import Unchecked from '../../assets/icon/unchecked.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTask } from '../../context/taskContext';
import { addTask, updateTask } from '../../services/api';
import { toast } from 'react-toastify';

const ToDo = (props) => {

    const { task, setTask, date, setDate, edit, setEdit, editId, handleEdit, handleDelete, taskCompleted } = props;

    const { taskDispatch, contextTask } = useTask();
    const [todayList, setTodayList] = useState([]);

    useEffect(() => {
        const filterData = contextTask?.tasks?.filter(item => new Date(item.date).getDate() === new Date().getDate());
        if (filterData.length) {
            setTodayList(filterData);
        }
    }, [contextTask.tasks]);

    const handlAddTask = async () => {
        let data = {};
        if (edit) {
            data = {
                taskId: editId,
                date: date,
                task: task
            }
        } else {
            data = {
                date: date,
                task: task
            }
        }
        try {
            let addedTask;
            if (edit) {
                addedTask = await updateTask(data);
            } else {
                addedTask = await addTask(data);
            }
            if (addedTask.data.status === 200) {
                toast.success(addedTask.data.message);
                taskDispatch({ type: edit ? 'UPDATE_TASK' : 'ADD', payload: addedTask.data.data });
                setDate(new Date());
                setTask('');
                setEdit(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const addDays = (date, days) => {
        return date.setDate(date.getDate() + days);
    }

    return (
        <div className='to_do_container'>
            <div className='control_area'>
                <div className='form_control'>
                    <div className='label'>Date</div>
                    <div className='form_input'>
                        <DatePicker
                            dateFormat='yyyy-MM-dd'
                            selected={date}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 5)}
                            showMonthDropdown
                            showYearDropdown
                            onChange={date => setDate(date)}
                        />
                    </div>
                </div>
                <div className='form_control'>
                    <div className='label'>Task</div>
                    <div className='form_input'>
                        <input type="text"
                            placeholder='Enter your task...'
                            value={task}
                            onChange={(e) => setTask(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className='btn_area'>
                    <button className='btn' type="submit" onClick={handlAddTask}>{edit ? 'Update' : 'Add Task'}</button>
                </div>
            </div>
            {todayList.length ? <div className='today_task_section'>
                <div className='title'>Today's Task</div>
                {todayList.map((element, index) => (<div className='list_section' key={index}>
                    <div className={`task_status ${element.completed ? 'disable_check' : ''}`} onClick={() => taskCompleted(element)}>
                        <img src={element.completed ? Checked : Unchecked} alt="state" />
                    </div>
                    <div className={`task ${element.completed ? 'completed' : ''}`}>{element.task}</div>
                    <div className='btn_section'>
                        <div className={`btn edit_btn ${element.completed ? 'disable_btn' : ''}`} onClick={() => handleEdit(element)}>
                            <img src={Edit} alt="edit" />
                        </div>
                        <div className='btn delete_btn' onClick={() => handleDelete(element._id)}>
                            <img src={Delete} alt="delete" />
                        </div>
                    </div>
                </div>))}
            </div>
                :
                <div className='no_task'>Add new task for today.</div>
            }
        </div>
    )
};

export default ToDo;