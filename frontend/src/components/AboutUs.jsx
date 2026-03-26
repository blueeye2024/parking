import React from 'react';
import { FaTag, FaBus, FaParking, FaShieldAlt, FaMapMarkerAlt, FaHandshake } from 'react-icons/fa';

const features = [
    { icon: FaTag, title: '공항 대비 50% 절약', desc: '공항 내 주차장 1일 10,000원, 저희는 1시간 500원, 1일 최대 5,000원(0시 이후 초기화)! 동일한 서비스, 절반의 비용으로 경험하세요.' },
    { icon: FaBus, title: '신속한 셔틀 서비스', desc: '주차장에서 공항까지 무료 셔틀버스를 운행합니다. (운행 시간: 04:00 ~ 새벽 1시)' },
    { icon: FaParking, title: '넉넉한 주차 공간', desc: '자동차 400대를 동시에 수용할 수 있는 대규모 전용 주차장 완비.' },
    { icon: FaShieldAlt, title: '철저한 안전 관리', desc: '24시간 CCTV 및 무인 차단기 설치로 도난 예방. 운행 차량 종합보험 및 주차 배상 책임보험 가입 완료.' },
];

const AboutUs = () => {
    return (
        <div className="animate-fade-in py-8 space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    청주공항 주차, 이제 절반 가격으로 더 여유롭게!
                </h2>
                <p className="text-slate-500 text-base">
                    주차난 걱정 끝! 1시간 500원, 1일 최대 5,000원(0시 이후 초기화)으로<br className="hidden sm:block" /> 즐기는 스마트한 여행의 시작<br />
                    <strong className="text-slate-700">청주공항 반값 셔틀주차장</strong>
                </p>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-xl font-bold text-brand-dark mb-4">서비스 소개 (About Us)</h3>
                <p className="text-slate-600 leading-relaxed">
                    청주국제공항의 고질적인 주차난으로 여행 전부터 스트레스 받으셨나요?
                </p>
                <p className="text-slate-600 leading-relaxed mt-2">
                    <strong>'청주공항 반값 셔틀주차장'</strong>은 공항 이용객들의 편의를 위해 탄생한 실속형 주차 서비스입니다.
                    공항에서 단 7분 거리(약 4km)에 위치하여, 합리적인 가격과 안전한 보안 시설로 고객님의 소중한 차량을 관리해 드립니다.
                </p>
            </div>

            {/* Key Features Grid */}
            <div>
                <h3 className="text-xl font-bold text-brand-dark mb-5">핵심 장점 (Key Features)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-brand rounded-xl flex-center">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{feat.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Trust Banner */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 ring-1 ring-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <FaHandshake className="text-brand" /> 믿고 맡길 수 있는 든든한 파트너
                </h3>
                <p className="text-slate-500 text-sm italic leading-relaxed">
                    청주공항 반값 셔틀주차장 박창현 대표는 "요즘 청주국제공항 내 주차장은 극심한 주차난으로 고객들이 낭패를 당하는 경우가 많다"면서 "이런 문제를 해소하는데 획기적인 도움을 주기 위해 <strong>'청주공항 반값 셔틀주차장'</strong>을 공항 인근에 개장하고 고객들이 안전하게 이용할 수 있도록 하고 있다"고 말했다.
                </p>
            </div>

            {/* Info & Map */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-brand-dark">이용 안내 (Information)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                        { label: '이용 요금', value: '1시간 500원, 1일 최대 5,000원 (0시 이후 초기화)' },
                        { label: '셔틀 운행', value: '04:00 ~ 새벽 1시까지' },
                        { label: '문의', value: '043-298-1234' },
                        { label: '예약', value: '010-5078-4756' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span className="font-semibold text-slate-700 flex-shrink-0">{item.label}</span>
                            <span className="text-slate-500">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Directions Guide */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2 mb-6">
                    📍 찾아오시는 길 안내
                </h3>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-5">
                        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                            <p className="text-slate-700 leading-relaxed font-medium">
                                저희 주차장 진입로가 초행길이신 경우 다소 헷갈리실 수 있습니다.<br className="hidden sm:block" />
                                방문 시 네비게이션은 <span className="font-bold text-brand text-lg">티맵(T map)</span>이나 <span className="font-bold text-yellow-500 text-lg">카카오내비</span>를 이용하시면<br className="hidden lg:block" /> 가장 정확하고 수월하게 안내받으실 수 있습니다.
                            </p>
                            <div className="mt-4 flex items-start gap-2 text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
                                <span className="text-lg leading-none">⚠️</span>
                                <span>네이버 지도(네비)는 주차장 진입로를 다르게 안내할 수 있어<br className="hidden sm:block" /> 사용을 피해주세요. (네이버 X)</span>
                            </div>
                        </div>

                        <div className="text-sm text-slate-600 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <p className="font-bold text-slate-800 mb-3 text-base flex items-center gap-2">
                                📸 진입로 참고 사진
                            </p>
                            <ul className="space-y-3 font-medium">
                                <li className="flex gap-2.5">
                                    <span className="text-brand font-bold w-4">1.</span>
                                    <span className="flex-1">삼거리에서 <span className="text-brand font-bold bg-brand/10 px-1 rounded">오른쪽 좁은 언덕길(노란색 화살표)</span>로 올라오셔야 합니다.</span>
                                </li>
                                <li className="flex gap-2.5">
                                    <span className="text-brand font-bold w-4">2.</span>
                                    <span className="flex-1">언덕을 다 올라오시면 보이는 <span className="font-bold text-red-500 bg-red-50 px-1 rounded">반값 셔틀 주차장 플랜카드</span> 방향(우회전)으로 진입해 주세요.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 rounded-2xl overflow-hidden bg-slate-100 shadow-sm relative group aspect-[3/4] sm:aspect-auto sm:h-[340px]">
                            <img src="/images/direction1.png" alt="진입로 안내 1 - 오른쪽 언덕길" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = 'https://placehold.co/400x600/f1f5f9/94a3b8?text=Road+Image+1'; }} />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
                        </div>
                        <div className="flex-1 rounded-2xl overflow-hidden bg-slate-100 shadow-sm relative group aspect-[4/3] sm:aspect-auto sm:h-[340px]">
                            <img src="/images/direction2.png" alt="진입로 안내 2 - 표지판 안내" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = 'https://placehold.co/600x400/f1f5f9/94a3b8?text=Road+Image+2'; }} />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
