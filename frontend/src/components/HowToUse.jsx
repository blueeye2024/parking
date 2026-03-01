import React from 'react';
import { FaCalendarCheck, FaCarSide, FaPlaneDeparture } from 'react-icons/fa';

const HowToUse = () => {
    return (
        <div className="card">
            <h2 className="page-title">이용 방법 안내</h2>

            <div style={{ marginTop: '2rem' }}>
                <div className="instruction-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                        <h3>온라인 예약 <FaCalendarCheck style={{ color: 'var(--primary-color)', marginLeft: '10px' }} /></h3>
                        <p>
                            저희 <strong>청주공항 반값셔틀주차장</strong> 웹사이트에서 차량 정보와 여정 일정을 입력하여 빠르고 쉽게 주차 대행 예약을 합니다.
                        </p>
                    </div>
                </div>

                <div className="instruction-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                        <h3>지정 장소 방문 <FaCarSide style={{ color: 'var(--primary-color)', marginLeft: '10px' }} /></h3>
                        <p>
                            출국 당일, 예약하신 시간에 맞추어 저희 주차장에 방문하시거나 지정된 미팅 장소에서 차량을 인계해 주세요.
                        </p>
                    </div>
                </div>

                <div className="instruction-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                        <h3>공항 이동 및 출국 <FaPlaneDeparture style={{ color: 'var(--primary-color)', marginLeft: '10px' }} /></h3>
                        <p>
                            저희가 제공하는 무료 셔틀 서비스를 통해 청주공항 출국장까지 편안하게 이동하신 후 즐거운 여행을 떠나세요!
                        </p>
                    </div>
                </div>

                <div className="instruction-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                        <h3>귀국 후 차량 인수 <FaCarSide style={{ color: 'var(--primary-color)', marginLeft: '10px', transform: 'scaleX(-1)' }} /></h3>
                        <p>
                            청주공항에 도착하신 후 연락주시면, 셔틀로 주차장까지 모시거나 게이트에서 바로 차량을 인수받을 수 있도록 준비해 드립니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
