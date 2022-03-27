import React, { useReducer, useContext } from 'react';

const NoteContext = React.createContext();

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                notes: [action.payload, ...state.notes],
                noteCount: state.noteCount + 1,
                totalNotes: state.totalNotes + 1
            };

        case 'ALL_NOTE':
            return {
                notes: action.payload.data && action.payload.data.length > 0 ? action.payload.data : [],
                noteCount: action.payload.sectionNotes,
                totalNotes: action.payload.totalNotes
            };

        case 'DELETE':
            return {
                notes: state.notes.filter(note => note._id !== action.payload),
                noteCount: state.noteCount - 1,
                totalNotes: state.totalNotes - 1
            }

        default:
            return state;
    }
}

let initialState = {
    notes: [],
    noteCount: 0,
    totalNotes: 0
}

export const NoteProvider = ({ children }) => {

    const [noteState, noteDispatch] = useReducer(noteReducer, initialState);

    return (
        <>
            <NoteContext.Provider value={{ contextNote: noteState, noteDispatch }}>
                {children}
            </NoteContext.Provider>
        </>
    )
}

export const useNote = () => {
    return useContext(NoteContext)
}