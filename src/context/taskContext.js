import React, { useReducer, useContext } from 'react';

const TaskContext = React.createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                tasks: [action.payload, ...state.tasks]
            };
        case 'GET_TASK':
            return {
                tasks: action.payload && action.payload.length > 0 ? action.payload : []
            };
        case 'UPDATE_TASK':
            let updatedList = [];
            state.tasks.forEach(element => {
                if (element._id === action.payload._id) {
                    element.task = action.payload.task;
                    element.date = action.payload.date;
                    element.completed = action.payload.completed;
                }
                updatedList.push(element)
            });
            return {
                tasks: updatedList
            };
        case 'DELETE':
            return {
                tasks: state.tasks.filter(task => task._id !== action.payload._id)
            }

        default:
            return state;
    }
}

let initialState = {
    tasks: []
}

export const TaskProvider = ({ children }) => {

    const [taskState, taskDispatch] = useReducer(taskReducer, initialState);

    return (
        <>
            <TaskContext.Provider value={{ contextTask: taskState, taskDispatch }}>
                {children}
            </TaskContext.Provider>
        </>
    )
}

export const useTask = () => {
    return useContext(TaskContext)
}