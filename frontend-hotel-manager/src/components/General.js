import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OverviewPage = () => {
    // Các dữ liệu về phòng và doanh số
    const availableRooms = 100;
    const rentedRooms = 50;
    const processingRooms = 10;
    const recentRooms = 5;
    const totalListings = 200;
    const soldListings = 150;

    // Dữ liệu hàng tuần về doanh số và số lượng căn
    const weeklySalesData = [
        { day: 'Mon', sales: 50 },
        { day: 'Tue', sales: 80 },
        { day: 'Wed', sales: 120 },
        { day: 'Thu', sales: 90 },
        { day: 'Fri', sales: 110 },
        { day: 'Sat', sales: 100 },
        { day: 'Sun', sales: 130 },
    ];
    const weeklyListingsData = [
        { day: 'Mon', listings: 10 },
        { day: 'Tue', listings: 20 },
        { day: 'Wed', listings: -5 },
        { day: 'Thu', listings: 30 },
        { day: 'Fri', listings: -10 },
        { day: 'Sat', listings: 20 },
        { day: 'Sun', listings: 15 },
    ];

    // Tính toán dữ liệu thay đổi so với tuần trước
    const weeklySalesChangeData = weeklySalesData.map((week, index) => {
        const previousWeek = weeklySalesData[index - 1];
        const change = previousWeek ? week.sales - previousWeek.sales : 0;
        return { ...week, change };
    });

    const weeklyListingsChangeData = weeklyListingsData.map((week, index) => {
        const previousWeek = weeklyListingsData[index - 1];
        const change = previousWeek ? week.listings - previousWeek.listings : 0;
        return { ...week, change };
    });

    return (
        <div className="container mt-4">
            <h1 className="mb-4" style={{ color: '#007acc' }}>Tổng quan</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Số phòng đang có sẵn</h5>
                            <p className="card-text">{availableRooms} phòng</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Số phòng đang cho thuê</h5>
                            <p className="card-text">{rentedRooms} phòng</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Số phòng đang xử lý</h5>
                            <p className="card-text">{processingRooms} phòng</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Số phòng nhập vào gần đây</h5>
                            <p className="card-text">{recentRooms} phòng</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Tổng số căn nhập</h5>
                            <p className="card-text">{totalListings}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Số căn đã bán</h5>
                            <p className="card-text">{soldListings}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mb-4" style={{ color: '#007acc' }}>Biểu đồ biểu thị số căn bán được trong tháng</h1>
                    <LineChart width={600} height={300}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" data={weeklySalesData} stroke="#007acc" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="listings" data={weeklyListingsData} stroke="#82ca9d" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="change" data={weeklySalesChangeData} stroke="#ff0000" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
