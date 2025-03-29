// 导入加密库（Cloudflare Worker支持Web Crypto API）
import { createTopClient } from './topclient.js';
import { htmlContent } from './frontend.js';

// 热门分类
const popularCategories = [
    { name: '女装', keyword: '女装' },
    { name: '男装', keyword: '男装' },
    { name: '数码', keyword: '数码' },
    { name: '美妆', keyword: '美妆' },
    { name: '家居', keyword: '家居' },
    { name: '母婴', keyword: '母婴' },
    { name: '食品', keyword: '食品' }
];

// 处理 CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request, env, ctx) {
        // 处理 OPTIONS 请求（CORS预检）
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        const pathname = url.pathname;
        
        try {
            // 初始化淘宝客API客户端
            const client = createTopClient({
                appkey: env.APPKEY || '33461650',
                appsecret: env.APPSECRET || 'e89c75c264766bcafb8bffd46fa60924',
                url: env.API_URL || 'http://gw.api.taobao.com/router/rest'
            });

            // 路由处理
            if (pathname === '/' || pathname === '/index.html') {
                // 返回前端HTML页面
                return new Response(htmlContent, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8'
                    }
                });
            } 
            else if (pathname === '/popular') {
                // 获取热门商品
                try {
                    const randomCategory = popularCategories[Math.floor(Math.random() * popularCategories.length)];
                    console.log(`Fetching popular items for category: ${randomCategory.name}`);
                    
                    const result = await searchItems(client, randomCategory.keyword, 1, env.ADZONE_ID || '111872750050');
                    
                    // 确保result_list和map_data存在
                    if (result && result.result_list && result.result_list.map_data && result.result_list.map_data.length > 0) {
                        const shuffled = result.result_list.map_data.sort(() => 0.5 - Math.random());
                        result.result_list.map_data = shuffled.slice(0, Math.min(9, shuffled.length));
                    }
                    
                    return new Response(JSON.stringify(result), {
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                } catch (error) {
                    console.error('Error in /popular route:', error);
                    return new Response(JSON.stringify({ 
                        error: error.message || 'Failed to fetch popular items',
                        result_list: { map_data: [] },
                        total_results: 0
                    }), {
                        status: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                }
            } 
            else if (pathname === '/search') {
                // 搜索商品
                try {
                    const params = new URL(request.url).searchParams;
                    const keyword = params.get('keyword');
                    const page = parseInt(params.get('page')) || 1;
                    
                    if (!keyword) {
                        return new Response(JSON.stringify({ 
                            error: '关键词不能为空',
                            result_list: { map_data: [] },
                            total_results: 0,
                            pagination: {
                                current_page: page,
                                total_pages: 0,
                                total_results: 0
                            }
                        }), {
                            status: 400,
                            headers: {
                                'Content-Type': 'application/json',
                                ...corsHeaders
                            }
                        });
                    }
                    
                    console.log(`Searching for keyword: "${keyword}" on page ${page}`);
                    const result = await searchItems(client, keyword, page, env.ADZONE_ID || '111872750050');
                    
                    // 添加分页信息
                    const response = {
                        ...result,
                        pagination: {
                            current_page: page,
                            total_pages: Math.ceil((result.total_results || 0) / 12),
                            total_results: result.total_results || 0
                        }
                    };
                    
                    return new Response(JSON.stringify(response), {
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                } catch (error) {
                    console.error('Error in /search route:', error);
                    return new Response(JSON.stringify({ 
                        error: error.message || 'Failed to search items',
                        result_list: { map_data: [] },
                        total_results: 0,
                        pagination: {
                            current_page: 1,
                            total_pages: 0,
                            total_results: 0
                        }
                    }), {
                        status: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                }
            } 
            else if (pathname === '/categories') {
                // 返回分类列表
                return new Response(JSON.stringify(popularCategories), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            } 
            else {
                // 404 处理
                return new Response('Not Found', {
                    status: 404,
                    headers: corsHeaders
                });
            }
        } catch (error) {
            // 统一错误处理
            console.error('Error:', error);
            return new Response(JSON.stringify({ 
                error: error.message || 'Internal Server Error',
                result_list: { map_data: [] },
                total_results: 0,
                pagination: {
                    current_page: 1,
                    total_pages: 0,
                    total_results: 0
                }
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }
    }
};

// 搜索商品并获取优惠券信息
async function searchItems(client, keyword, page = 1, adzoneId) {
    console.log(`Searching for items with keyword: "${keyword}", page: ${page}, adzoneId: ${adzoneId}`);
    
    const params = {
        'adzone_id': adzoneId,
        'q': keyword,
        'has_coupon': 'true',
        'page_size': 12,
        'page_no': page
    };
    
    try {
        // 执行API调用
        const apiResponse = await client.execute('taobao.tbk.dg.material.optional.upgrade', params);
        
        // 检查API响应结构
        console.log('API Response Structure:', JSON.stringify(apiResponse).substring(0, 500) + '...');
        
        // 处理空响应
        if (!apiResponse) {
            console.log('Empty API response for keyword:', keyword);
            return {
                result_list: { map_data: [] },
                total_results: 0,
                error_info: 'Empty API response'
            };
        }
        
        // 检查错误响应
        if (apiResponse.error_response) {
            console.error('API Error:', apiResponse.error_response);
            return {
                result_list: { map_data: [] },
                total_results: 0,
                error_info: apiResponse.error_response.sub_msg || apiResponse.error_response.msg || 'API Error'
            };
        }
        
        // 从正确的嵌套结构中获取结果
        const responseKey = 'tbk_dg_material_optional_upgrade_response';
        if (!apiResponse[responseKey]) {
            console.log(`Missing response key: ${responseKey} for keyword: ${keyword}`);
            console.log('Available keys:', Object.keys(apiResponse).join(', '));
            
            return {
                result_list: { map_data: [] },
                total_results: 0,
                error_info: `Missing response key: ${responseKey}`
            };
        }
        
        // 获取响应数据
        const response = apiResponse[responseKey];
        console.log('Response structure keys:', Object.keys(response).join(', '));
        
        // 检查是否有数据
        if (!response.result_list) {
            console.log(`No result_list in response for keyword: ${keyword}`);
            return {
                result_list: { map_data: [] },
                total_results: 0,
                error_info: 'No result_list in response'
            };
        }
        
        // 确保map_data存在并且是数组
        if (!response.result_list.map_data) {
            console.log(`No map_data in result_list for keyword: ${keyword}`);
            response.result_list.map_data = [];
        } else if (!Array.isArray(response.result_list.map_data)) {
            console.log(`map_data is not an array for keyword: ${keyword}, converting to array`);
            // 如果map_data存在但不是数组，将其转换为数组
            response.result_list.map_data = [response.result_list.map_data];
        }
        
        const items = response.result_list.map_data;
        console.log(`Found ${items.length} items for keyword "${keyword}"`);
        
        // 添加总结果数
        response.total_results = response.total_results || items.length;
        
        // 打印商品信息（仅用于调试）
        if (items.length > 0) {
            items.forEach((item, index) => {
                try {
                    if (index < 3) { // 只打印前3个商品的详细信息，避免日志过长
                        console.log(`\n------------------------Item ${index + 1}------------------------`);
                        if (item.item_basic_info && item.item_basic_info.title) {
                            console.log('商品标题:', item.item_basic_info.title);
                        }
                        
                        if (item.price_promotion_info && item.price_promotion_info.zk_final_price) {
                            console.log('原价:', item.price_promotion_info.zk_final_price, '元');
                            
                            const finalPrice = item.price_promotion_info.final_promotion_price;
                            if (finalPrice) {
                                const discount = (parseFloat(item.price_promotion_info.zk_final_price) - parseFloat(finalPrice)).toFixed(2);
                                console.log('优惠金额:', discount, '元');
                                console.log('券后价:', finalPrice, '元');
                            }
                        }
                        
                        if (item.publish_info) {
                            if (item.publish_info.click_url) {
                                console.log('商品链接:', item.publish_info.click_url.substring(0, 100) + '...');
                            }
                            if (item.publish_info.coupon_share_url) {
                                console.log('优惠券链接:', item.publish_info.coupon_share_url.substring(0, 100) + '...');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error processing item:', error);
                }
            });
        } else {
            console.log(`No items found in the response for keyword: ${keyword}`);
        }
        
        return response;
    } catch (error) {
        console.error(`Error in searchItems for keyword "${keyword}":`, error);
        // 返回一个空的结果结构，而不是抛出错误
        return {
            result_list: { map_data: [] },
            total_results: 0,
            error_info: error.message
        };
    }
} 