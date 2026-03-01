import React, { useState } from 'react';
import axios from 'axios';

const CheckReservation = () => {
    const [credentials, setCredentials] = useState({ phone: '', password: '' });
    const [reservation, setReservation] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        setReservation(null);

        try {
            const response = await axios.post('/api/reservations/check', credentials);
            setReservation(response.data);
            setStatus({ type: 'success', message: '예약 내역을 불러왔습니다.' });
        } catch (err) {
            console.error(err);
            setStatus({
                type: 'error',
                message: err.response?.data?.error || '예약 정보를 확인할 수 없습니다.'
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="card">
            <h2 className="page-title">예약 확인</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)' }}>
                등록하신 연락처와 비밀번호를 입력해주세요.
            </p>

            {status.message && (
                <div className={`alert alert-${status.type}`}>
                    {status.message}
                </div>
            )}

            {!reservation ? (
                <form onSubmit={handleCheck}>
                    <div className="form-group">
                        <label className="form-label">연락처</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={credentials.phone}
                            onChange={handleChange}
                            placeholder="예: 010-1234-5678"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="예약 시 입력한 비밀번호"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? '확인 중...' : '예약 조회하기'}
                    </button>
                </form>
            ) : (
                <div>
                    <table className="result-table">
                        <tbody>
                            <tr>
                                <th>예약자명</th>
                                <td>{reservation.name}</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>{reservation.phone}</td>
                            </tr>
                            <tr>
                                <th>차량종류</th>
                                <td>{reservation.car_type}</td>
                            </tr>
                            <tr>
                                <th>차량번호</th>
                                <td>{reservation.car_number}</td>
                            </tr>
                            <tr>
                                <th>맡기는 시간</th>
                                <td>{formatDate(reservation.drop_off_time)}</td>
                            </tr>
                            <tr>
                                <th>찾는 시간</th>
                                <td>{formatDate(reservation.pick_up_time)}</td>
                            </tr>
                            {reservation.memo && (
                                <tr>
                                    <th>메모</th>
                                    <td>{reservation.memo}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button
                        className="btn-primary"
                        style={{ marginTop: '2rem' }}
                        onClick={() => { setReservation(null); setCredentials({ phone: '', password: '' }); setStatus({ type: '', message: '' }) }}
                    >
                        다른 예약 조회하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckReservation;
