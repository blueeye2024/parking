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
        companions: '',
        flight_number: '',
        destination: '',
        memo: '',
        password: '',
        hand_wash: 'N'
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [completedReservation, setCompletedReservation] = useState(null);
    const [showWashModal, setShowWashModal] = useState(false);

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

    const handleDropOffBlur = (e) => {
        const { name, value } = e.target;
        if (!value) return;
        const date = new Date(value);
        if (isNaN(date.getTime())) return;
        const minutes = date.getMinutes();
        if (minutes % 30 !== 0) {
            const roundedMinutes = minutes < 15 ? 0 : (minutes < 45 ? 30 : 0);
            if (minutes >= 45) {
                date.setHours(date.getHours() + 1);
            }
            date.setMinutes(roundedMinutes);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const mins = String(date.getMinutes()).padStart(2, '0');

            setFormData(prev => ({ ...prev, [name]: `${year}-${month}-${day}T${hours}:${mins}` }));
            setStatus({ type: 'error', message: '도착 시간은 30분 단위(00분, 30분)로 자동 조정되었습니다.' });
            setTimeout(() => {
                setStatus(prev => prev.message === '도착 시간은 30분 단위(00분, 30분)로 자동 조정되었습니다.' ? { type: '', message: '' } : prev);
            }, 4000);
        }
    };

    const formatDateTime = (dt) => {
        if (!dt) return '';
        const d = new Date(dt);
        return d.toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.car_number || !formData.name || !formData.phone || !formData.drop_off_time || !formData.pick_up_time || !formData.companions || !formData.flight_number || !formData.destination || !formData.password) {
            setStatus({ type: 'error', message: '모든 필수 항목(* 표시)을 입력해주세요.' });
            return;
        }

        const dropOffMinutes = new Date(formData.drop_off_time).getMinutes();
        if (dropOffMinutes % 30 !== 0) {
            setStatus({ type: 'error', message: '주차장 도착 시간은 30분 단위(00분, 30분)로만 예약 가능합니다.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/api/reservations', formData);
            setCompletedReservation(response.data.reservation);
            setStatus({ type: 'success', message: '예약이 성공적으로 완료되었습니다! 입력하신 번호로 확인 문자가 발송됩니다.' });
            setFormData({
                car_type: '', car_number: '', name: '', phone: '',
                drop_off_time: '', pick_up_time: '', companions: '', flight_number: '', destination: '', memo: '', password: '', hand_wash: 'N'
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
        <>
            <div className="space-y-8 animate-fade-in">
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
                            <span className="text-blue-300">무료 셔틀버스 운행</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                            <span className="text-white font-bold">전화 문의</span> 043-298-1234 / 010-5078-4756<br className="sm:hidden" />
                            <span className="hidden sm:inline"> · </span>1시간 500원 / 1일 최대 5,000원 <span className="text-sm">(0시 이후 초기화)</span>
                        </p>
                        <p className="text-base sm:text-lg text-slate-300 font-medium mt-1">
                            무료 셔틀 · 출차 하실 때 차단기에서 결제 (아이파킹)
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
                    transition-all duration-300 ease-out border-t-4 border-t-brand ring-1 ring-brand/10 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">50% OFF</div>
                        <p className="text-sm font-medium text-slate-500 mb-3 group-hover:text-red-500 transition-colors duration-300">
                            1일 최대 주차 요금<br className="hidden sm:block" /> <span className="text-xs">(1시간 500원, 0시 이후 초기화)</span>
                        </p>
                        <p className="text-sm text-slate-400 line-through mb-1">공항 주차장 10,000원</p>
                        <p className="text-3xl font-extrabold text-brand group-hover:text-red-600 transition-colors duration-300">
                            5,000<span className="text-lg font-semibold text-slate-500 ml-1 group-hover:text-red-400 transition-colors duration-300">원</span>
                        </p>
                        <p className="text-xs text-brand font-semibold mt-2">출차 시 차단기 결제 (아이파킹)</p>
                    </div>

                    {/* Shuttle Card */}
                    {[{ label: '무료 셔틀 운행', value: '04:00 ~ 새벽 01:00', unit: '' },
                    { label: '공항까지 소요시간', value: '7', unit: '분' }].map((item, i) => (
                        <div key={i} className={`group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center cursor-default
                        hover:shadow-[0_12px_28px_-6px_rgba(239,68,68,0.25)] hover:-translate-y-2 hover:scale-[1.03] hover:border-red-300
                        transition-all duration-300 ease-out border-t-4 border-t-slate-200`}>
                            <p className="text-sm font-medium text-slate-500 mb-4 group-hover:text-red-500 transition-colors duration-300">{item.label}</p>
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
                                    { label: '주차장 도착 시간', value: formatDateTime(completedReservation.drop_off_time) },
                                    { label: '공항 귀국 시간', value: formatDateTime(completedReservation.pick_up_time) },
                                    { label: '셔틀탑승인원', value: completedReservation.companions || '없음' },
                                    { label: '도착항공편', value: completedReservation.flight_number || '미기재' },
                                    { label: '여행지', value: completedReservation.destination || '미기재' },
                                    { label: '이용일수', value: `${completedReservation.days}일` },
                                    { label: '예상 금액', value: `${completedReservation.price?.toLocaleString()}원` },
                                    { label: '손세차', value: completedReservation.hand_wash === 'Y' ? '신청 (3만원~)' : '미신청' },
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
                                <div className="hidden">
                                    <label className={labelClass}>차량종류</label>
                                    <input type="text" className={inputClass} name="car_type" value={formData.car_type} onChange={handleChange} placeholder="예: 소나타, 산타페" />
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
                                    <label className={labelClass}>연락처 <span className="text-red-500">*</span></label>
                                    <input type="tel" className={inputClass} name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="숫자만 입력 (자동 하이픈)" required />
                                </div>
                            </div>

                            {/* Row 3: Times */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>주차장 도착 시간 <span className="text-red-500">*</span></label>
                                    <input type="datetime-local" className={inputClass} name="drop_off_time" value={formData.drop_off_time} onChange={handleChange} onBlur={handleDropOffBlur} step="1800" required />
                                </div>
                                <div>
                                    <label className={labelClass}>공항 귀국 시간 <span className="text-red-500">*</span></label>
                                    <input type="datetime-local" className={inputClass} name="pick_up_time" value={formData.pick_up_time} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Row 4: Travel Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className={labelClass}>셔틀탑승인원 <span className="text-red-500">*</span></label>
                                    <input type="text" className={inputClass} name="companions" value={formData.companions} onChange={handleChange} placeholder="예: 2명" required />
                                </div>
                                <div>
                                    <label className={labelClass}>도착항공편 <span className="text-red-500">*</span></label>
                                    <input type="text" className={inputClass} name="flight_number" value={formData.flight_number} onChange={handleChange} placeholder="예: 이스타, KE1234" required />
                                </div>
                                <div>
                                    <label className={labelClass}>여행지 <span className="text-red-500">*</span></label>
                                    <input type="text" className={inputClass} name="destination" value={formData.destination} onChange={handleChange} placeholder="예: 제주도, 오사카" required />
                                </div>
                            </div>

                            {/* Hand Wash */}
                            <div className="hidden">
                                <label className={labelClass}>손세차 신청</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input type="radio" name="hand_wash" value="N" checked={formData.hand_wash === 'N'} onChange={handleChange} className="w-4 h-4 text-brand" />
                                        <span className="text-sm text-slate-700">미신청</span>
                                    </label>
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input type="radio" name="hand_wash" value="Y" checked={formData.hand_wash === 'Y'} onChange={handleChange} className="w-4 h-4 text-brand" />
                                        <span className="text-sm text-slate-700 font-semibold">신청</span>
                                    </label>
                                    <div className="ml-auto flex items-center gap-2">
                                        <span className="text-xs text-slate-400">(30,000원~)</span>
                                        <button type="button" onClick={() => setShowWashModal(true)} className="text-xs text-brand hover:text-brand-light font-semibold underline underline-offset-2 transition-colors">상세보기</button>
                                    </div>
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
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold text-lg shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
                                >
                                    {loading ? '예약 중...' : '예약하기'}
                                </button>
                                <p className="text-center text-sm text-slate-500 mt-4 font-medium">
                                    예약 진행 시 개인정보 수집 및 이용에 동의하는 것으로 간주합니다.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Hand Wash Modal */}
            {
                showWashModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setShowWashModal(false)}>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">세차 요금표</h3>
                                <button onClick={() => setShowWashModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="text-sm text-slate-700 space-y-6">
                                {/* 승용차 요금표 */}
                                <div>
                                    <table className="w-full text-center border-collapse text-xs sm:text-sm">
                                        <thead>
                                            <tr className="bg-red-400 text-white">
                                                <th className="border border-red-300 py-2 w-1/5">구분</th>
                                                <th className="border border-red-300 py-2 w-3/5">차종</th>
                                                <th className="border border-red-300 py-2 w-1/5">세차비</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">경차</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600">마티즈, 모닝, 레이, 캐스퍼 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">30,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">소형</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600">아반떼, 엑센트, 프라이드, SM3, K3 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">35,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">중형</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600 leading-tight">소나타, 크루즈, i40, K5, SM5, G70<br />C클래스, 3시리즈 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">40,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">준중형</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600 leading-tight">그랜저, 말리부, K7, SM6, SM7<br />E클래스, 5시리즈 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">45,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">대형</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600 leading-tight">에쿠스, 임팔라, K8, K9, G80, 그랜져(GN7)<br />S클래스, 7시리즈 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">50,000</td>
                                            </tr>
                                            <tr className="bg-red-400 text-white">
                                                <th colSpan="3" className="border border-red-300 py-1.5 font-medium">RV차량</th>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50 leading-tight">소형<br />RV</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600 leading-tight">코나, 쏘울, 니로, 투싼, 셀토스,<br />베뉴, 스포티지, 스토닉, 티볼리, XM3 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">50,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50 leading-tight">중형<br />RV</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600 leading-tight">싼타페, 쏘렌토, 모하비, 올란도,<br />팰리세이드, 토레스, QM6, 제네시스GV 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">60,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-slate-50">승합</td>
                                                <td className="border border-slate-200 py-2 text-left px-3 text-slate-600">스타렉스, 렉스턴, 투리스모, 카니발 등</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">70,000</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="border border-slate-200 py-2 font-medium bg-white">RV 수입차량</td>
                                                <td className="border border-slate-200 py-2 font-bold bg-yellow-300">60,000</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-200 py-2 font-medium bg-yellow-500">추가시공</td>
                                                <td colSpan="2" className="border border-slate-200 py-2 font-medium bg-yellow-300">물 왁스 코팅 20,000 &nbsp;&nbsp;|&nbsp;&nbsp; 유리 발수 코팅 10,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* 주의사항 */}
                                <div className="bg-slate-50 rounded-xl p-4 text-xs sm:text-sm">
                                    <p className="font-bold text-center mb-3 text-slate-800">※ 주의사항 ※</p>
                                    <ul className="space-y-1.5 list-disc list-outside ml-4 text-slate-600">
                                        <li>차량의 <span className="text-red-500 font-bold">심한 오염 상태 및 크기</span>에 따라 <span className="text-red-500 font-bold">추가 비용</span>이 발생할 수 있습니다.</li>
                                        <li><span className="text-red-500 font-bold">귀중품은 차내에 보관 시</span> 책임지지 않습니다.</li>
                                        <li><span className="text-red-500 font-bold">기상 상황</span>에 따라 <span className="text-red-500 font-bold">세차가 불가</span>할 수 있습니다. <span className="text-red-500 font-bold">특히 비, 눈, 강풍</span> 등으로 인해 작업이 어려울 수 있으니 <span className="text-red-500 font-bold">예약 전 날씨를 꼭 확인해 주세요.</span></li>
                                        <li>작업 소요시간: 약 1~2시간 (<span className="text-red-500 font-bold">차량 오염 상태</span>에 따라 변동될 수 있습니다)</li>
                                        <li>세차 후 <span className="text-red-500 font-bold">차량 상태</span>는 관리에 따라 달라질 수 있습니다.</li>
                                    </ul>
                                </div>
                            </div>

                            <button onClick={() => setShowWashModal(false)} className="mt-6 w-full py-3.5 bg-brand hover:bg-brand-light text-white rounded-xl font-bold transition-colors">닫기</button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Reserve;

