import React from 'react';
import { FaCalendarCheck, FaCarSide, FaPlaneDeparture } from 'react-icons/fa';

const steps = [
    {
        num: '1',
        icon: FaCalendarCheck,
        title: '온라인 예약',
        desc: '저희 청주공항 반값셔틀주차장 웹사이트에서 차량 정보와 여정 일정을 입력하여 빠르고 쉽게 주차 대행 예약을 합니다.',
    },
    {
        num: '2',
        icon: FaCarSide,
        title: '지정 장소 방문',
        desc: '출국 당일, 예약하신 시간에 맞추어 저희 주차장으로 직접 방문해 주세요.',
    },
    {
        num: '3',
        icon: FaPlaneDeparture,
        title: '공항 이동 및 출국',
        desc: '저희가 제공하는 무료 셔틀 서비스를 통해 청주공항 출국장까지 편안하게 이동하신 후 즐거운 여행을 떠나세요!',
    },
    {
        num: '4',
        icon: FaCarSide,
        title: '귀국 후 차량 인수',
        desc: '실시간으로 귀국편 공항 도착을 확인 후 픽업갑니다. 위탁수화물을 찾으신 후 연락주시면 게이트앞(10분 단속) 빈자리 주차후 위치, 셔틀차량 말씀드리고 셔틀로 본사 주차장까지 모십니다.',
        flipIcon: true,
    },
];

const HowToUse = () => {
    return (
        <div className="animate-fade-in py-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">이용 방법 안내</h2>
                <p className="text-slate-500 mt-2 text-sm">간단한 4단계로 편리하게 이용하세요</p>
            </div>

            <div className="space-y-5 max-w-3xl mx-auto">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 flex items-start gap-5 hover:shadow-md transition-shadow duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Number Badge */}
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-brand rounded-xl flex-center font-bold text-xl ring-4 ring-white shadow-sm">
                                {step.num}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    {step.title}
                                    <Icon className={`text-brand-light text-base ${step.flipIcon ? 'scale-x-[-1]' : ''}`} />
                                </h3>
                                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HowToUse;
