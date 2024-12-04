'use client'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// ماژول‌های Chart.js که نیاز داریم را رجیستر می‌کنیم
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart(props) {
    const { products, orders, users, category } = props
    const p = products.length;
    const o = orders.length;
    const u = users.length;
    const c = category.length;

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; 
    }

    const data = {
        labels: ['Users', 'Products', 'Category', 'Sales'],
        datasets: [
            {
                label: '# of Votes',
                data: [u, p, c, o], // 4 عدد برای 4 برچسب
                backgroundColor: [
                    'rgba(0, 148, 158, 0.78)',
                    'rgba(255, 197, 87, 0.78)',
                    'rgba(237, 123, 91,  0.78)',
                    'rgba(93, 96, 239, 0.78)',
                ],
                // borderColor: [
                //     'rgba(244, 232, 255, 1)',
                //     'rgba(220, 252, 231, 1)',
                //     'rgba(255, 244, 222, 1)',
                //     'rgba(255, 226, 230,1)',
                // ],
                // borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        let value = context.raw || '';
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return <Pie data={data} options={options} />;
}
