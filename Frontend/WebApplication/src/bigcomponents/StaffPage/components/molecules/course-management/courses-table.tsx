import React, { useEffect, useState } from 'react'
import api from '../../../../../config/axios';
import './courses-table.scss'
import { Link, useNavigate } from 'react-router-dom'

function CourseTable() {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState(null);

    const getAllCourse = async () => {
        const response = await api.get('Course/list');
        const res = response.data;
        setData(res);
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 6;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = data.slice(firsIndex, lastIndex);
    const npage = Math.ceil(data.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const overallIndex = (currentPage - 1) * recordPage;

    useEffect(() => {
        getAllCourse();
    }, [])

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCPage = (id: number) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleDelete = async (courseId) => {
        try {
            // Perform the deletion
            await api.delete('Course/deactivate/' + courseId);

            // Reload the page after successful 
            setTimeout(() => {
                location.reload();
            }, 0.1);

            // Once deletion is successful, fetch the updated data
            await getAllCourse();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='courses-table-container'>
            <div className="courses-table-title text-center text-uppercase">
                <h1>Danh sách khoá học</h1>
            </div>
            <div className='courses-table-content'>
                <form action="">
                    <div className='d-flex justify-content-end'>
                        <Link to='tao-khoa-hoc' className='btn btn-success mb-2'>+ Add</Link>
                    </div>
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Sta.Date</th>
                                <th scope='col'>End.Date</th>
                                <th className='text-center' scope='col'>StudentNum</th>
                                <th className='text-center' scope='col'>LimitStudent</th>
                                <th scope='col' className='text-center'>Status</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((course, i) => (
                                    <tr key={i}>
                                        <td>{overallIndex + i + 1}</td>
                                        <td>{course.courseId}</td>
                                        <td>{course.name}</td>
                                        <td>{formatDate(course.startDate)}</td>
                                        <td>{formatDate(course.endDate)}</td>
                                        <td className='text-center'>{course.numberOfStudents}</td>
                                        <td className='text-center'>{course.limitStudent}</td>
                                        <td className='text-center'>{course.status.toString().toUpperCase()}</td>
                                        <td className='button text-center'>
                                            <button className="btn btn-primary" type="submit">Update</button>
                                            <button className="btn btn-danger" type="button" onClick={(e) => handleDelete(course.courseId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9}>
                                        <h1 className='text-center text-red-600 p-5'>
                                            Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                                        </h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a href="#" className='page-link'
                                    onClick={prePage}>Prev</a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className='page-link'
                                            onClick={() => changeCPage(n)}>{n}</a>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <a href="#" className='page-link'
                                    onClick={nextPage}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default CourseTable