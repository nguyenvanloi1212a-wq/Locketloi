try {
    // 1. Kiểm tra xem có dữ liệu phản hồi không (Tránh NullPointerException)
    if (typeof $response === "undefined" || !$response.body) {
        console.log("❌ Không có body từ server Locket");
        $done({});
        return;
    }

    let body = $response.body;
    let obj;

    // 2. Parse JSON an toàn
    try {
        obj = JSON.parse(body);
    } catch (e) {
        console.log("❌ Dữ liệu không phải chuẩn JSON:", body);
        $done({ body }); 
        return;
    }

    // 3. Kiểm tra object có tồn tại không trước khi chọc vào thuộc tính
    if (!obj || typeof obj !== 'object') {
        console.log("❌ Object parse ra bị null hoặc lỗi");
        $done({ body });
        return;
    }

    // 4. Khởi tạo cấu trúc cây (Tree) an toàn
    if (!obj.subscriber) obj.subscriber = {};
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    // 5. Bơm dữ liệu Gold
    const gold = {
        "expires_date": "2099-12-31T23:59:59Z",
        "original_purchase_date": "2022-01-01T00:00:00Z",
        "purchase_date": "2022-01-01T00:00:00Z",
        "ownership_type": "PURCHASED"
    };

    obj.subscriber.subscriptions["locket_gold_yearly"] = gold;
    obj.subscriber.entitlements["gold"] = gold;

    // Trả kết quả về cho Locket
    $done({ body: JSON.stringify(obj) });

} catch (err) {
    // Ép kiểu lỗi thành string để Shadowrocket in ra được chi tiết lỗi thay vì {}
    console.log("❌ Lỗi lớn rùi: " + (err.message || err));
    $done({});
}
