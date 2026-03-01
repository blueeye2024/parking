import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaSignOutAlt, FaRedo, FaTrash } from 'react-icons/fa';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');

    // Check initial auth state from localStorage
    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setIsAuthenticated(true);
            fetchReservations(adminToken);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            // Typically /api/admin/login in production setup
            const response = await axios.post((import.meta.env.VITE_API_BASE_URL || '') + '/api/admin/login', { username, password });
            if (response.data.success) {
                // Use password as token for simple setup
                const token = `${username}:${password}`;
                localStorage.setItem('adminToken', token);
                setIsAuthenticated(true);
                fetchReservations(token);
            }
        } catch (err) {
            setLoginError(err.response?.data?.error || '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setReservations([]);
    };

    const fetchReservations = async (token) => {
        setLoading(true);
        setFetchError('');
        try {
            const response = await axios.get((import.meta.env.VITE_API_BASE_URL || '') + '/api/admin/reservations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReservations(response.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleLogout(); // Token invalid
            } else {
                setFetchError('데이터를 불러오는데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    // 1. Login Screen
    if (!isAuthenticated) {
        return (
            <div className="card" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
                <FaUserShield size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h2 className="page-title">관리자 로그인</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="관리자 계정 아이디"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="관리자 계정 비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    {loginError && <p className="error-message" style={{ color: 'var(--error-color)', fontSize: '0.9rem', marginBottom: '1rem' }}>{loginError}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>로그인</button>
                </form>
            </div>
        );
    }

    // 2. Dashboard Screen
    return (
        <div className="card" style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="page-title" style={{ marginBottom: 0 }}>
                    <FaUserShield style={{ marginRight: '10px' }} />
                    예약 관리 대시보드
                </h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <span
                        onClick={() => fetchReservations(localStorage.getItem('adminToken'))}
                        style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <FaRedo /> 새로고침
                    </span>
                    <span
                        onClick={handleLogout}
                        style={{ color: 'var(--text-light)', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <FaSignOutAlt /> 로그아웃
                    </span>
                </div>
            </div>

            {fetchError && <p className="error-message" style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{fetchError}</p>}

            <div style={{ overflowX: 'auto' }}>
                {loading ? (
                    <p style={{ textAlign: 'center', padding: '2rem' }}>데이터를 불러오는 중입니다...</p>
                ) : reservations.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>등록된 예약 정보가 없습니다.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'var(--border-color)', borderBottom: '2px solid var(--primary-color)' }}>
                                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>ID</th>
                                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>예약자(연락처)</th>
                                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>차량정보</th>
                                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>입고 / 출고 일정</th>
                                <th style={{ padding: '1rem' }}>메모</th>
                                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>접수일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((res) => (
                                <tr key={res.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>#{res.id}</td>
                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                                        <strong>{res.name}</strong> <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>({res.phone})</span>
                                    </td>
                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                                        {res.car_type} / <strong>{res.car_number}</strong>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                                        <span style={{ color: 'var(--primary-color)' }}>입고: {new Date(res.drop_off_time).toLocaleString('ko-KR')}</span>
                                        <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
                                        <span>출고: {new Date(res.pick_up_time).toLocaleString('ko-KR')}</span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.memo || '-'}</td>
                                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
                                        {new Date(res.created_at).toLocaleString('ko-KR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Admin;
