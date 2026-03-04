import React, { useState } from 'react';
import axios from 'axios';

const Reserve = () => {
    const [formData, setFormData] = useState({
        car_type: '',
        car_number: '',
        name: '',
        phone: '',
        drop_off_time: '',
        pick_up_time: '',
        memo: '',
        password: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [completedReservation, setCompletedReservation] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Car number: only Korean + digits, no spaces
    const handleCarNumberChange = (e) => {
        const filtered = e.target.value.replace(/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        setFormData(prev => ({ ...prev, car_number: filtered }));
    };

    // Phone auto-format: numbers only → auto-insert dashes (010-1234-5678)
    const handlePhoneChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        let formatted = raw;
        if (raw.length > 3 && raw.length <= 7) {
            formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
        } else if (raw.length > 7) {
            formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
        }
        setFormData(prev => ({ ...prev, phone: formatted }));
    };

    const formatDateTime = (dt) => {
        if (!dt) return '';
        const d = new Date(dt);
        return d.toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/api/reservations', formData);
            setCompletedReservation(response.data.reservation);
            setStatus({ type: 'success', message: '예약이 성공적으로 완료되었습니다! 입력하신 번호로 확인 문자가 발송됩니다.' });
            setFormData({
                car_type: '', car_number: '', name: '', phone: '',
                drop_off_time: '', pick_up_time: '', memo: '', password: ''
            });
        } catch (err) {
            console.error(err);
            setStatus({
                type: 'error',
                message: err.response?.data?.error || '예약 처리 중 오류가 발생했습니다.'
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white transition-all duration-200 placeholder:text-slate-400";
    const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl min-h-[380px] flex-center flex-col text-center px-6 py-16">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-brand-dark/50 to-brand/40" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                        청주공항 반값 주차,<br />
                        <span className="text-blue-300">서비스는 프리미엄으로.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 font-medium">
                        공항 주차장의 <span className="text-white font-bold">딱 절반 가격!</span> · 1일 5,000원 · 무료 셔틀
                    </p>
                    <button
                        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand/30 hover:shadow-brand-light/40 transition-all duration-300 transform hover:-translate-y-0.5"
                        onClick={() => document.getElementById('reserve-form').scrollIntoView({ behavior: 'smooth' })}
                    >
                        지금 바로 예약하기
                    </button>
                </div>
            </div>

            {/* Price Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Price Comparison Card */}
                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center cursor-default
                    hover:shadow-[0_12px_28px_-6px_rgba(239,68,68,0.25)] hover:-translate-y-2 hover:scale-[1.03] hover:border-red-300
                    transition-all duration-300 ease-out border-t-4 border-t-brand ring-1 ring-brand/10 relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">50% OFF</div>
                    <p className="text-sm font-medium text-slate-500 mb-3 group-hover:text-red-500 transition-colors duration-300">1일 주차 요금</p>
                    <p className="text-sm text-slate-400 line-through mb-1">공항 주차장 10,000원</p>
                    <p className="text-3xl font-extrabold text-brand group-hover:text-red-600 transition-colors duration-300">
                        5,000<span className="text-lg font-semibold text-slate-500 ml-1 group-hover:text-red-400 transition-colors duration-300">원</span>
                    </p>
                    <p className="text-xs text-emerald-600 font-semibold mt-2">매일 5,000원 절약!</p>
                </div>

                {/* Shuttle Card */}
                {[{ label: '무료 셔틀 운행', value: '04:00 ~ 익일 01:00', unit: '' },
                { label: '공항까지 소요시간', value: '7', unit: '분' }].map((item, i) => (
                    <div key={i} className={`group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center cursor-default
                        hover:shadow-[0_12px_28px_-6px_rgba(239,68,68,0.25)] hover:-translate-y-2 hover:scale-[1.03] hover:border-red-300
                        transition-all duration-300 ease-out border-t-4 border-t-slate-200`}>
                        <p className="text-sm font-medium text-slate-500 mb-2 group-hover:text-red-500 transition-colors duration-300">{item.label}</p>
                        <p className="text-3xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors duration-300">
                            {item.value}
                            {item.unit && <span className="text-lg font-semibold text-slate-500 ml-1 group-hover:text-red-400 transition-colors duration-300">{item.unit}</span>}
                        </p>
                    </div>
                ))}
            </div>

            {/* Reservation Form */}
            <div id="reserve-form" className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 animate-slide-up">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 tracking-tight">
                    주차장 이용 예약하기
                </h2>

                {status.message && (
                    <div className={`p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium ${status.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                        : 'bg-orange-50 border border-orange-200 text-orange-600'
                        }`}>
                        {status.message}
                    </div>
                )}

                {completedReservation ? (
                    <div className="animate-slide-up space-y-6">
                        <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl p-6">
                            {[
                                { label: '예약자명', value: completedReservation.name },
                                { label: '연락처', value: completedReservation.phone },
                                { label: '차량종류', value: completedReservation.car_type },
                                { label: '차량번호', value: completedReservation.car_number },
                                { label: '맡기는 시간', value: formatDateTime(completedReservation.drop_off_time) },
                                { label: '공항 귀국 시간', value: formatDateTime(completedReservation.pick_up_time) },
                                { label: '이용일수', value: `${completedReservation.days}일` },
                                { label: '예상 금액', value: `${completedReservation.price?.toLocaleString()}원` },
                                ...(completedReservation.memo ? [{ label: '메모', value: completedReservation.memo }] : []),
                            ].map((row, i) => (
                                <div key={i} className="flex py-3.5">
                                    <span className="w-28 flex-shrink-0 text-sm text-slate-500 font-medium">{row.label}</span>
                                    <span className="text-sm text-slate-900 font-semibold">{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-base transition-colors"
                            onClick={() => { setCompletedReservation(null); setStatus({ type: '', message: '' }); }}
                        >
                            새 예약하기
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Row 1: Car Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>차량종류</label>
                                <input type="text" className={inputClass} name="car_type" value={formData.car_type} onChange={handleChange} placeholder="예: 소나타, 산타페" required />
                            </div>
                            <div>
                                <label className={labelClass}>차량번호</label>
                                <input type="text" className={inputClass} name="car_number" value={formData.car_number} onChange={handleCarNumberChange} placeholder="예: 12가3456" required />
                            </div>
                        </div>

                        {/* Row 2: Booker Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>예약자명</label>
                                <input type="text" className={inputClass} name="name" value={formData.name} onChange={handleChange} placeholder="이름을 입력해주세요" required />
                            </div>
                            <div>
                                <label className={labelClass}>연락처</label>
                                <input type="tel" className={inputClass} name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="숫자만 입력 (자동 하이픈)" required />
                            </div>
                        </div>

                        {/* Row 3: Times */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>차량 맡기는 시간</label>
                                <input type="datetime-local" className={inputClass} name="drop_off_time" value={formData.drop_off_time} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className={labelClass}>공항 귀국 시간</label>
                                <input type="datetime-local" className={inputClass} name="pick_up_time" value={formData.pick_up_time} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelClass}>비밀번호 (예약 확인용)</label>
                            <input type="password" className={inputClass} name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력해주세요" required />
                        </div>

                        {/* Memo */}
                        <div>
                            <label className={labelClass}>메모</label>
                            <textarea className={`${inputClass} min-h-[120px] resize-y py-3`} name="memo" value={formData.memo} onChange={handleChange} placeholder="추가 요청사항을 적어주세요" />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold text-lg shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
                        >
                            {loading ? '예약 중...' : '예약하기'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Reserve;
