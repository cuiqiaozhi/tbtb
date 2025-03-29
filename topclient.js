// 简化版的淘宝客SDK，适用于普通Node.js环境
import crypto from 'crypto';
import fetch from 'node-fetch'; // 需要安装: npm install node-fetch

// MD5哈希函数 (使用Node.js crypto模块)
function md5(message) {
    return crypto.createHash('md5').update(message).digest('hex');
}
  
// 创建淘宝客API客户端
export function createTopClient(options) {
    const { appkey, appsecret, url = 'http://gw.api.taobao.com/router/rest' } = options;
    
    return {
        // 执行API调用
        async execute(method, params) {
            // 构建请求参数
            const requestParams = {
                method: method,
                app_key: appkey,
                timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                ...params
            };
            
            // 生成签名
            const sign = await generateSign(requestParams, appsecret);
            requestParams.sign = sign;
            
            // 构建查询字符串 - 修复编码问题
            const queryString = Object.keys(requestParams)
                .sort() // 确保参数按字母顺序排序
                .map(key => {
                    // 正确的URL编码，确保符合淘宝API要求
                    const encodedValue = encodeURIComponent(requestParams[key])
                        .replace(/!/g, '%21')
                        .replace(/'/g, '%27')
                        .replace(/\(/g, '%28')
                        .replace(/\)/g, '%29')
                        .replace(/\*/g, '%2A');
                    return `${encodeURIComponent(key)}=${encodedValue}`;
                })
                .join('&');
            
            console.log('Request URL:', `${url}?${queryString}`);
            
            try {
                // 发送请求
                console.log(`Sending API request for method: ${method}`);
                const response = await fetch(`${url}?${queryString}`);
                
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return {
                        error_response: {
                            code: response.status,
                            msg: `HTTP error: ${response.statusText}`,
                            sub_msg: `Status code: ${response.status}`
                        }
                    };
                }
                
                // 获取响应文本
                const responseText = await response.text();
                
                // 只打印前500个字符，避免日志过长
                console.log('API Response Text (first 500 chars):', responseText.substring(0, 500) + '...');
                
                // 解析JSON响应
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (error) {
                    console.error('Failed to parse API response:', error);
                    return {
                        error_response: {
                            code: -1,
                            msg: 'Failed to parse API response',
                            sub_msg: error.message
                        }
                    };
                }
                
                // 检查错误响应
                if (result.error_response) {
                    console.error('API Error:', result.error_response);
                    return result; // 直接返回包含错误信息的响应
                }
                
                // 检查是否有响应数据
                const responseKey = method.replace('.', '_') + '_response';
                if (result[responseKey]) {
                    console.log('Found response key:', responseKey);
                    
                    // 检查是否有结果列表
                    const responseData = result[responseKey];
                    if (responseData.result_list && responseData.result_list.map_data) {
                        // 确保map_data是数组
                        if (!Array.isArray(responseData.result_list.map_data)) {
                            console.log('Converting map_data to array');
                            responseData.result_list.map_data = [responseData.result_list.map_data];
                        }
                        
                        const itemCount = responseData.result_list.map_data.length;
                        console.log(`Found ${itemCount} items in response`);
                    } else {
                        console.log('No items found in response');
                        
                        // 确保result_list和map_data存在
                        if (!responseData.result_list) {
                            responseData.result_list = {};
                        }
                        if (!responseData.result_list.map_data) {
                            responseData.result_list.map_data = [];
                        }
                    }
                } else {
                    console.log('Response key not found:', responseKey);
                    console.log('Available keys:', Object.keys(result).join(', '));
                    
                    // 如果找不到响应键，创建一个空的响应结构
                    result[responseKey] = {
                        result_list: { map_data: [] },
                        total_results: 0
                    };
                }
                
                // 直接返回完整响应，让调用者处理具体的响应结构
                return result;
            } catch (error) {
                console.error('API request failed:', error);
                // 返回一个包含错误信息的对象
                return {
                    error_response: {
                        code: -1,
                        msg: 'API request failed',
                        sub_msg: error.message
                    }
                };
            }
        }
    };
}
  
// 生成API签名 - 修复签名生成逻辑
async function generateSign(params, appsecret) {
    // 按照字母顺序排序参数
    const keys = Object.keys(params).sort();
    
    // 构建签名字符串 - 修复，确保正确拼接
    let signStr = '';
    for (const key of keys) {
        // 跳过空值参数
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            signStr += key + params[key];
        }
    }
    
    // 在签名字符串前后加上秘钥
    signStr = appsecret + signStr + appsecret;
    
    console.log('Signing string:', signStr);
    
    // 计算MD5并转为大写（淘宝API要求）
    return md5(signStr).toUpperCase();
} 