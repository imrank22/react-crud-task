import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUsers } from '../userSlice';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

export default function AddUser({ user, users }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const [newUser, setUser] = useState({
        id: null,
        username: null,
        email: null,
        website: null,
        companyName: null
    })

    useEffect(() => {
        if (user) {
            setUser(user)
            setValue("id", user.id)
            setValue("username", user.username)
            setValue("email", user.email)
            setValue("website", user.website)
            setValue("companyName", user.companyName)
        }
    }, [user])

    const addUser = (data) => {
        let newUsers = JSON.parse(JSON.stringify(users))

        data['id'] = newUsers.length + 1
        newUsers.push(data)
        dispatch(setUsers(newUsers))
        resetCurrentUser()
    }

    const updateUser = (data) => {
        let newUsers = JSON.parse(JSON.stringify(users))
        newUsers = newUsers.map(ele => {
            if (ele.id === newUser['id']) ele = data
            return ele
        })
        dispatch(setUsers(newUsers))
        resetCurrentUser()
    }

    const resetCurrentUser = () => {
        setUser({
            id: null,
            username: null,
            email: null,
            website: null,
            companyName: null
        })
        reset()
    }

    const onSubmit = data => {
        if (data?.id) updateUser(data)
        else addUser(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='d-grid form-grid'>

                <div className='data-field'>
                    <p>Username</p>
                    <input {...register("username", { required: true, pattern: /^[A-Za-z]+$/i })} />
                </div>

                <div className='data-field'>
                    <p>Email</p>
                    <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i })} />
                </div>

                <div className='data-field'>
                    <p>Website</p>
                    <input {...register("website", { required: true, pattern: /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ })} />
                </div>

                <div className='data-field'>
                    <p>Company name</p>
                    <input {...register("companyName", { required: true, pattern: /^[A-Za-z- ]+$/i })} />
                </div>

            </div>
            <Button type='submit' variant="contained">Submit</Button>

            <div className='form-errors'>
                {errors.username && <span role="alert" style={{ color: 'red' }}>Username is invalid</span>}
                {errors.email && <span role="alert" style={{ color: 'red' }}>Email is invalid</span>}
                {errors.website && <span role="alert" style={{ color: 'red' }}>Website is invalid</span>}
                {errors.companyName && <span role="alert" style={{ color: 'red' }}>Company name is invalid</span>}
            </div>
        </form>
    )
}
