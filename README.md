var obj = JSON.parse($response.body);
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
$done({body: JSON.stringify(obj)});
