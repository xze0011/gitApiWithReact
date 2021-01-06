import {CHANGEINPUT,SEARCHSUBJECT,GITOBJ} from './actionType'

export const changeInputAction = (value) => ({
    type:CHANGEINPUT,
    value
})

export const getListAction = (data) => ({
    type:GITOBJ,
    data
})

export const fetchBtnAction = () => ({
    type:SEARCHSUBJECT
})
