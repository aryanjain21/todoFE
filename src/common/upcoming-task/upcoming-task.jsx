import './upcoming-task.scss';
import Edit from '../../assets/icon/edit.svg';
import Delete from '../../assets/icon/delete.svg';
import { useState, useEffect } from 'react';

const UpcomingTask = (props) => {

    const { list, handleEdit, handleDelete } = props;

    // const [listId, setListId] = useState(null);
    const [upcomingTask, setUpcomingTask] = useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const filterData = list.filter(item => new Date(item.date).getDate() !== new Date().getDate());
        // let day = [];
        // let dateData;
        // console.log(filterData)
        // for (let index = 0; index < filterData.length; index++) {
        //     day.push(new Date(filterData[index].date).getDate());
        //     console.log(day)
        //     dateData = new Set(day)
        //     console.log(dateData)
        // }
        filterData.forEach(element => {
            if (new Date(element.date).getDate() < new Date().getDate() || new Date(element.date).getMonth() < new Date().getMonth() || new Date(element.date).getFullYear() < new Date().getFullYear()) {
                handleDelete(element._id);
            }
        });
        if (filterData.length) {
            setUpcomingTask(filterData);
        }
        // eslint-disable-next-line
    }, [list]);

    // const showSection = (id) => {
    //     if (listId === id) {
    //         setListId(null);
    //     } else {
    //         setListId(id);
    //     }
    // }

    return (
        <div className='upcoming_task_container'>
            <div className='head_txt'>Upcoming Tasks</div>
            {upcomingTask.length ? upcomingTask.map((element, index) => (<div className='inner_wrapper' key={index}>
                {/* <div className='header_section' onClick={() => showSection(element._id)}>
                    <div className='title'>Task - {new Date(element.date).getDate() > 9 ? new Date(element.date).getDate() : '0' + new Date(element.date).getDate()} {monthNames[new Date(element.date).getMonth()]}</div>
                    <div className='icon'>V</div>
                </div> */}
                {<div className='list_section'>
                    <div className='task'>
                        {element.task}
                        <sub className='task_date'>Date - {new Date(element.date).getDate() > 9 ? new Date(element.date).getDate() : '0' + new Date(element.date).getDate()} {monthNames[new Date(element.date).getMonth()]}</sub>
                    </div>
                    <div className='btn_section'>
                        <div className='btn edit_btn' onClick={() => handleEdit(element)}>
                            <img src={Edit} alt="edit" />
                        </div>
                        <div className='btn delete_btn' onClick={() => handleDelete(element._id)}>
                            <img src={Delete} alt="delete" />
                        </div>
                    </div>
                </div>}
            </div>)) : <div className='no_task'>Please add upcoming new task.</div>}
        </div>
    );
};

export default UpcomingTask;