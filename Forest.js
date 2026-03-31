/*
Forest Plus 解锁逻辑 - 兼容性增强版
*/
let body = $response.body;
if (body) {
    let obj = JSON.parse(body);
    
    // 1. 处理最常见的 premium 字段
    obj.is_premium = true;
    obj.service_level = "subscription";
    
    // 2. 如果存在 subscription 结构，注入详细信息
    if (!obj.subscription) obj.subscription = {};
    obj.subscription.expires_at = "2099-12-31T23:59:59Z";
    obj.subscription.sku_id = "forest_annual_early_bird";
    obj.subscription.is_auto_renewing = true;

    // 3. 兼容某些版本可能用的 plus/pro 字段
    if (obj.data) {
        obj.data.is_pro = true;
        obj.data.pro_expiry_date = "2099-12-31T23:59:59Z";
    }

    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}
