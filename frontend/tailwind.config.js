/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // 기본 sans 폰트를 Pretendard로 덮어쓰기
                sans: ['Pretendard', 'sans-serif'],
            },
            colors: {
                // 필요하다면 브랜드 고유의 '블루 엣지' 컬러를 변수로 지정할 수 있습니다.
                brand: {
                    light: '#3b82f6', // blue-500
                    DEFAULT: '#2563eb', // blue-600 (메인 액션)
                    dark: '#1e40af',  // blue-800 (헤더, 타이틀)
                }
            }
        },
    },
    plugins: [],
}
