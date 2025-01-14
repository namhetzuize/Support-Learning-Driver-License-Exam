import { Link, useNavigate } from 'react-router-dom'
import './registered-course.scss'
import { useEffect, useState } from 'react'
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function RegisteredCourse() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;

    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState(null);

    const getMemberById = async () => {
        try {
            const respone = await api.post('Member?userID=' + user.userID);
            const res = respone.data;
            setMember(res);
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseById = async () => {
        try {
            const response = await api.get('Course/' + member.courseId);
            const res = response.data;
            console.log(res);
            setCourse(res);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMemberById();
    }, [])

    useEffect(() => {
        getCourseById();
    }, [member])

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="registered-course-container">
            <h1 className='registered-course-title'>khoá học của bạn</h1>
            {
                member != null ? (
                    !isLoading ? (
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
                                    <label htmlFor="course-practice-location">Trạng thái học lý thuyết: (Status)</label>
                                </li>
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
                        <>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={true}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </>
                    )
                ) : (
                    <h1 className='mt-5 text-danger'>Bạn chưa đăng ký khoá học nào</h1>
                )
            }

        </div>
    )
}

export default RegisteredCourse