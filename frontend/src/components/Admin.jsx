import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaSignOutAlt, FaSync } from 'react-icons/fa';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');

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
            const response = await axios.post('/api/admin/login', { username, password });
            if (response.data.success) {
                const token = `${username}:${password}`;
                localStorage.setItem('adminToken', token);
                setIsAuthenticated(true);
                fetchReservations(token);
            }
        } catch (err) {
            setLoginError(err.response?.data?.error || '로그인에 실패했습니다.');
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
            const response = await axios.get('/api/admin/reservations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReservations(response.data);
        } catch (err) {
            if (err.response?.status === 401) {
                handleLogout();
            } else {
                setFetchError('데이터를 불러오는데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDT = (dt) => new Date(dt).toLocaleString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });

    const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white transition-all duration-200 placeholder:text-slate-400";

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="animate-fade-in flex justify-center py-16">
                <div className="w-full max-w-sm">
                    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                                <FaUserShield className="text-brand text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">관리자 로그인</h2>
                        </div>

                        {loginError && (
                            <div className="bg-orange-50 border border-orange-200 text-orange-600 p-3 rounded-xl text-sm font-medium mb-5">
                                {loginError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input type="text" className={inputClass} placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <input type="password" className={inputClass} placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit" className="w-full py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold text-base shadow-md shadow-brand/20 hover:shadow-lg transition-all duration-300 mt-2">
                                로그인
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard Screen
    return (
        <div className="animate-fade-in space-y-6">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <FaUserShield className="text-brand" /> 예약 관리
                    <span className="text-sm font-normal text-slate-400 ml-2">총 {reservations.length}건</span>
                </h2>
                <div className="flex items-center gap-5 text-base">
                    <button onClick={() => fetchReservations(localStorage.getItem('adminToken'))} className="text-brand font-semibold flex items-center gap-1 hover:text-brand-light transition-colors">
                        <FaSync className={loading ? 'animate-spin' : ''} /> 새로고침
                    </button>
                    <button onClick={handleLogout} className="text-slate-500 font-semibold flex items-center gap-1 hover:text-slate-700 transition-colors">
                        <FaSignOutAlt /> 로그아웃
                    </button>
                </div>
            </div>

            {fetchError && (
                <div className="bg-orange-50 border border-orange-200 text-orange-600 p-4 rounded-xl text-sm font-medium">
                    {fetchError}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
                {loading ? (
                    <p className="text-center py-16 text-slate-400">데이터를 불러오는 중...</p>
                ) : reservations.length === 0 ? (
                    <p className="text-center py-16 text-slate-400">등록된 예약 정보가 없습니다.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-base">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-brand/20">
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">ID</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">예약자</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">연락처</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">차량</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">입고</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">출고</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">일수</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">금액</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">메모</th>
                                    <th className="px-5 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">접수일</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {reservations.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap">#{r.id}</td>
                                        <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{r.name}</td>
                                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{r.phone}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className="text-slate-500">{r.car_type}</span>
                                            <span className="font-semibold text-slate-900 ml-1">{r.car_number}</span>
                                        </td>
                                        <td className="px-5 py-4 text-brand whitespace-nowrap">{formatDT(r.drop_off_time)}</td>
                                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{formatDT(r.pick_up_time)}</td>
                                        <td className="px-5 py-4 text-slate-900 font-semibold whitespace-nowrap">{r.days || '-'}일</td>
                                        <td className="px-5 py-4 text-slate-900 font-semibold whitespace-nowrap">{r.price ? r.price.toLocaleString() + '원' : '-'}</td>
                                        <td className="px-5 py-4 text-slate-500 max-w-[140px] truncate">{r.memo || '-'}</td>
                                        <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">{formatDT(r.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
