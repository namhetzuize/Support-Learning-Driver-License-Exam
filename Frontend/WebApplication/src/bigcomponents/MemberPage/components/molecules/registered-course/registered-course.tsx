import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './registered-course.scss';
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function RegisteredCourse() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [student, setStudent] = useState(null);
    const [theoryStatus, setTheoryStatus] = useState(null);

    const getMemberByUID = async () => {
        try {
            const response = await api.get('Member/' + user.userID);
            const res = response.data;
            setMember(res);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    // const getCourseById = async () => {
    //     try {
    //         const response = await api.get('Course/' + member.courseId);
    //         const res = response.data;
    //         setCourse(res);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // const getStudentById = async () => {
    //     try {
    //         const response = await api.get('Student/' + member.memberID);
    //         const res = response.data;
    //         console.log(res);
    //         setStudent(res);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // const getTheoryTestStatus = async () => {
    //     try {
    //         const response = await api.get('TestByStudentId?studentId=' + student.studentId);
    //         console.log(response.data);
    //         setTheoryStatus(response.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         try {
    //             await getCourseById();
    //             await getStudentById();
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        getMemberByUID();
    }, [])

    // useEffect(() => {
    //     if (student && student.studentId) {
    //         getTheoryTestStatus();
    //         console.log(member);
    //     }
    // }, [student]);

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="registered-course-container">
            <h1 className='registered-course-title'>Khoá học của bạn</h1>
            {
                member !== null ? (
                    !isLoading ? (
                        member.isPaid ? (
                            <div className='registered-course-content'>
                                <ul>
                                    <li>
                                        <label htmlFor="course-name">Khoá học: {course.name}</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-start">Ngày khai giảng: {formatDate(course.startDate)}</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-theory">
                                            <Link to='/khoa-hoc-cua-ban/lich-hoc-ly-thuyet'>Lịch học lý thuyết</Link>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-practice-location">Trạng thái học lý thuyết: {theoryStatus && theoryStatus.pass ? "Hoàn thành" : "Chưa hoàn thành"}</label>
                                    </li>
                                    {theoryStatus && theoryStatus.pass ? (
                                        <>
                                            <li>
                                                <label htmlFor="course-practice">
                                                    <Link to='/khoa-hoc-cua-ban/lich-hoc-thuc-hanh'>Lịch học thực hành</Link>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="course-theory-location">
                                                    <Link to='/danh-sach-khoa-hoc'>Đăng ký lịch học thực hành</Link>
                                                </label>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <label htmlFor="course-practice">
                                                    <Link to='/khoa-hoc-cua-ban/lich-hoc-thuc-hanh' className='disabled-link'>Lịch học thực hành</Link>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="course-theory-location">
                                                    <Link to='/danh-sach-khoa-hoc' className='disabled-link'>Đăng ký lịch học thực hành</Link>
                                                </label>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <label htmlFor="course-theory-location">Địa điểm học: Trung tâm dạy lái xe B2 FDriving</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-practice-isPaid">Trạng thái thanh toán: {member.isPaid ? "Đã đóng tiền" : "Chưa đóng tiền"}</label>
                                    </li>
                                    <li>
                                        <form>
                                            <label htmlFor="exam-application">
                                                <Link to='/ho-so-thi'>Hồ sơ thi</Link>
                                            </label>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className='registered-course-content'>
                                <ul>
                                    <li>
                                        <span className='fst-italic tw-text-red-500'>Bạn cần thanh toán học phí để truy cập vào khoá học</span>
                                    </li>
                                    <li>
                                        <label htmlFor="course-name" className='disabled-link'>Khoá học: {course.name}</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-start" className='disabled-link'>Ngày khai giảng: {formatDate(course.startDate)}</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-theory">
                                            <Link to='/khoa-hoc-cua-ban/lich-hoc-ly-thuyet' className='disabled-link' onClick={(e) => e.preventDefault()}>Lịch học lý thuyết</Link>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-practice-location" className='disabled-link'>Trạng thái học lý thuyết:</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-practice">
                                            <Link to='/khoa-hoc-cua-ban/lich-hoc-thuc-hanh' className='disabled-link' onClick={(e) => e.preventDefault()}>Lịch học thực hành</Link>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-theory-location">
                                            <Link to='/danh-sach-khoa-hoc' className='disabled-link' onClick={(e) => e.preventDefault()}>Đăng ký lịch học thực hành</Link>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-theory-location" className='disabled-link'>Địa điểm học: Trung tâm dạy lái xe B2 FDriving</label>
                                    </li>
                                    <li>
                                        <label htmlFor="course-practice-isPaid">Trạng thái thanh toán: {member.isPaid ? "Đã đóng tiền" : "Chưa đóng tiền"}</label>
                                    </li>
                                    <li>
                                        <form>
                                            <label htmlFor="exam-application">
                                                <Link to='/ho-so-thi' className='disabled-link' onClick={(e) => e.preventDefault()}>Hồ sơ thi</Link>
                                            </label>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        )
                    ) : (
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )
                ) : (
                    <h1 className='mt-5 text-danger'>Bạn chưa đăng ký khoá học nào</h1>
                )}
        </div>
    )
}

export default RegisteredCourse;
