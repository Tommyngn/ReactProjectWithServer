import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const JobTitleSelect = ({job, changeJob}) => {
    const jobTitleOptions = ['TA RepA', 'TA RepB', 'Direct RepA', 'Direct RepB']
    const [jobTitle, setJobTitle] = useState("")

    useEffect(() => {
        if(job !== "") {
            const indexOfJob = jobTitleOptions.findIndex((a) => a === job)
            setJobTitle(indexOfJob)
        }
    },[job])
    return (
        <FormControl fullWidth>
            <Select 
                label="Age"
                value={jobTitle}
                onChange={(event) => {changeJob(jobTitleOptions[event.target.value])}}
            >
                <MenuItem value={0}>{jobTitleOptions[0]}</MenuItem>
                <MenuItem value={1}>{jobTitleOptions[1]}</MenuItem>
                <MenuItem value={2}>{jobTitleOptions[2]}</MenuItem>
                <MenuItem value={3}>{jobTitleOptions[3]}</MenuItem>
            </Select>
        </FormControl>  

    )
};

export default JobTitleSelect;