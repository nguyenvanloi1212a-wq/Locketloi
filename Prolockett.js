try {
    let body = $response.body;
    let obj;

    try {
        obj = JSON.parse(body);
    } catch (e) {
        console.log("❌ Không phải JSON");
        $done({ body }); // KHÔNG dùng return nữa
    }

    if (obj) {
        obj.subscriber = obj.subscriber || {};
        obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
        obj.subscriber.entitlements = obj.subscriber.entitlements || {};

        const gold = {
            "expires_date": "2099-12-31T23:59:59Z",
            "original_purchase_date": "2022-01-01T00:00:00Z",
            "purchase_date": "2022-01-01T00:00:00Z",
            "ownership_type": "PURCHASED"
        };

        obj.subscriber.subscriptions["locket_gold_yearly"] = gold;
        obj.subscriber.entitlements["gold"] = gold;

        $done({ body: JSON.stringify(obj) });
    }

} catch (err) {
    console.log("❌ Lỗi:", err);
    $done({});
}
