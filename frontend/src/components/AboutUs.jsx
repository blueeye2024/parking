import React from 'react';
import { FaTag, FaBus, FaParking, FaShieldAlt, FaMapMarkerAlt, FaHandshake } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="card">
            <h2 className="page-title">청주공항 주차, 이제 절반 가격으로 더 여유롭게!</h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
                주차난 걱정 끝! 1일 5,000원으로 즐기는 스마트한 여행의 시작 <br />
                <strong>청주 반값 셔틀 주차장</strong>
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
                <h3 className="section-title" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>서비스 소개 (About Us)</h3>
                <p style={{ lineHeight: '1.6' }}>
                    청주국제공항의 고질적인 주차난으로 여행 전부터 스트레스 받으셨나요?
                </p>
                <p style={{ lineHeight: '1.6', marginTop: '0.5rem' }}>
                    <strong>'청주 반값 셔틀 주차장'</strong>은 공항 이용객들의 편의를 위해 탄생한 실속형 주차 서비스입니다.
                    공항에서 단 7분 거리(약 5km)에 위치하여, 합리적인 가격과 안전한 보안 시설로 고객님의 소중한 차량을 관리해 드립니다.
                </p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <h3 className="section-title" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>핵심 장점 (Key Features)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FaTag style={{ color: 'var(--primary-color)', marginTop: '4px', flexShrink: 0 }} size={20} />
                        <div>
                            <strong>압도적인 가격 경쟁력:</strong><br />
                            공항 내 주차장 대비 50% 저렴한 1일 5,000원의 파격적인 요금!
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FaBus style={{ color: 'var(--primary-color)', marginTop: '4px', flexShrink: 0 }} size={20} />
                        <div>
                            <strong>신속한 셔틀 서비스:</strong><br />
                            주차장에서 공항까지 무료 셔틀버스를 운행합니다. (운행 시간: 07:00 ~ 22:00)
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FaParking style={{ color: 'var(--primary-color)', marginTop: '4px', flexShrink: 0 }} size={20} />
                        <div>
                            <strong>넉넉한 주차 공간:</strong><br />
                            자동차 400대를 동시에 수용할 수 있는 대규모 전용 주차장 완비.
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FaShieldAlt style={{ color: 'var(--primary-color)', marginTop: '4px', flexShrink: 0 }} size={20} />
                        <div>
                            <strong>철저한 안전 관리:</strong><br />
                            * 24시간 CCTV 및 무인 차단기 설치로 도난 예방.<br />
                            운행 차량 종합보험 및 주차 배상 책임보험 가입 완료로 안심하고 맡기실 수 있습니다.
                        </div>
                    </li>
                </ul>
            </div>

            <div style={{ marginBottom: '2.5rem', backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h3 className="section-title" style={{ color: 'var(--text-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaHandshake color="var(--primary-color)" /> 믿고 맡길 수 있는 든든한 파트너
                </h3>
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>
                    "즐거운 여행의 시작이 주차 때문에 망쳐져서는 안 됩니다. 한국노총 충북본부 등 다양한 기관과 협약을 맺어 신뢰도를 검증받은 <strong>'청주 반값 셔틀 주차장'</strong>을 이용해 보세요. 공항 주차장 만차 시에도 당황하지 말고, 가장 빠르고 경제적인 대안을 선택하세요."
                </p>
            </div>

            <div>
                <h3 className="section-title" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>이용 안내 (Information)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>위치:</strong> 충북 청주시 청원구 외남동 76-1 (청주공항 7분 거리)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>이용 요금:</strong> 1일 5,000원 (정찰제)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>셔틀 운행:</strong> 오전 7시 ~ 오후 10시</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>문의 및 예약:</strong> 043-298-1234 / 010-5178-4756</li>
                </ul>

                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                    <FaMapMarkerAlt /> 오시는 길
                </h4>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e9ecef', borderRadius: '8px', overflow: 'hidden' }}>
                    {/* Using Naver Maps Mobile URL via iframe as a simple map integration */}
                    <iframe
                        src="https://m.map.naver.com/map.naver?query=충청북도 청주시 청원구 외남동 76-1"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="청주공항 반값셔틀주차장 위치"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
