import React, { useState } from 'react';
import axios from 'axios';
import { FaShieldAlt } from 'react-icons/fa';

const CheckReservation = () => {
    const [credentials, setCredentials] = useState({ car_number: '', password: '' });
    const [reservation, setReservation] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleCarNumberChange = (e) => {
        const filtered = e.target.value.replace(/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        setCredentials(prev => ({ ...prev, car_number: filtered }));
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
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white transition-all duration-200 placeholder:text-slate-400";

    return (
        <div className="animate-fade-in flex justify-center py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                            <FaShieldAlt className="text-brand text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">예약 확인</h2>
                        <p className="text-slate-500 mt-2 text-sm">안전하게 보호된 예약 정보를 확인합니다.</p>
                    </div>

                    {/* Alert */}
                    {status.message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${status.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                            : 'bg-orange-50 border border-orange-200 text-orange-600'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    {!reservation ? (
                        <form onSubmit={handleCheck} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">차량번호</label>
                                <input type="text" className={inputClass} name="car_number" value={credentials.car_number} onChange={handleCarNumberChange} placeholder="예: 12가3456" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
                                <input type="password" className={inputClass} name="password" value={credentials.password} onChange={handleChange} placeholder="예약 시 입력한 비밀번호" required />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold text-base shadow-md shadow-brand/20 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? '확인 중...' : '예약 조회하기'}
                            </button>
                        </form>
                    ) : (
                        <div className="animate-slide-up">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { label: '예약자명', value: reservation.name },
                                    { label: '연락처', value: reservation.phone },
                                    { label: '차량종류', value: reservation.car_type },
                                    { label: '차량번호', value: reservation.car_number },
                                    { label: '주차장 도착 시간', value: formatDate(reservation.drop_off_time) },
                                    { label: '공항 귀국 시간', value: formatDate(reservation.pick_up_time) },
                                    { label: '셔틀탑승인원', value: reservation.companions || '없음' },
                                    { label: '도착항공편', value: reservation.flight_number || '미기재' },
                                    { label: '여행지', value: reservation.destination || '미기재' },
                                    ...(reservation.memo ? [{ label: '메모', value: reservation.memo }] : []),
                                ].map((row, i) => (
                                    <div key={i} className="flex py-3.5">
                                        <span className="w-28 flex-shrink-0 text-sm text-slate-500 font-medium">{row.label}</span>
                                        <span className="text-sm text-slate-900 font-semibold">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="w-full py-4 mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-base transition-colors"
                                onClick={() => { setReservation(null); setCredentials({ car_number: '', password: '' }); setStatus({ type: '', message: '' }); }}
                            >
                                다른 예약 조회하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckReservation;
