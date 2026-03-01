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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Assuming the Nginx proxy is set up or using direct API
            // Since they are on the same domain usually, we use relative URL /api/reservations
            await axios.post('/api/reservations', formData);
            setStatus({ type: 'success', message: '예약이 성공적으로 완료되었습니다.' });
            setFormData({
                car_type: '',
                car_number: '',
                name: '',
                phone: '',
                drop_off_time: '',
                pick_up_time: '',
                memo: '',
                password: ''
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

    return (
        <>
            <div className="hero-section" style={{
                background: 'linear-gradient(rgba(0, 70, 140, 0.7), rgba(0, 70, 140, 0.7)), url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80") center/cover',
                color: 'white',
                padding: '4rem 2rem',
                textAlign: 'center',
                borderRadius: '16px',
                marginBottom: '2rem',
                animation: 'fadeIn 0.5s ease'
            }}>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>청주공항 주차, 절반 가격으로 가볍게!</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>서비스는 프리미엄으로</p>
                <button
                    className="btn-primary"
                    style={{ maxWidth: '300px', margin: '0 auto', backgroundColor: '#007BFF', fontSize: '1.25rem' }}
                    onClick={() => document.getElementById('reserve-form').scrollIntoView({ behavior: 'smooth' })}
                >
                    실시간 예약하기
                </button>
            </div>

            <div className="price-cards" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderTop: '4px solid #007BFF' }}>
                    <h3 style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '1rem' }}>1일 주차 요금</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>5,000<span style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>원</span></div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderTop: '4px solid #007BFF' }}>
                    <h3 style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '1rem' }}>무료 셔틀 운행</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>07:00 ~ 22:00</div>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderTop: '4px solid #007BFF' }}>
                    <h3 style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '1rem' }}>공항까지 소요 시간</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>7<span style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>분</span></div>
                </div>
            </div>

            <div className="card" id="reserve-form">
                <h2 className="page-title">주차 대행 예약하기</h2>

                {status.message && (
                    <div className={`alert alert-${status.type}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">차량종류</label>
                            <input
                                type="text"
                                className="form-control"
                                name="car_type"
                                value={formData.car_type}
                                onChange={handleChange}
                                placeholder="예: 소나타, 산타페"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">차량번호</label>
                            <input
                                type="text"
                                className="form-control"
                                name="car_number"
                                value={formData.car_number}
                                onChange={handleChange}
                                placeholder="예: 12가 3456"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">예약자명</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="이름을 입력해주세요"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">연락처</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="예: 010-1234-5678"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">차량 맡기는 시간</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="drop_off_time"
                                value={formData.drop_off_time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">차량 찾는 시간</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="pick_up_time"
                                value={formData.pick_up_time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">비밀번호 (예약 확인용)</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">메모</label>
                        <textarea
                            className="form-control"
                            name="memo"
                            value={formData.memo}
                            onChange={handleChange}
                            placeholder="추가 요청사항을 적어주세요"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? '예약 중...' : '예약하기'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Reserve;
