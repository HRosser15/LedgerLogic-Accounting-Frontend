import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/UserService';


const UserList = () => {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    return (
        <div className='container'>
            <h2 className='text-center'>User List</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div style={{ height: '200px' }}></div>
        </div>
    );
};

export default UserList;
