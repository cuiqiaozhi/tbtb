// 前端HTML内容
export const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>淘宝优惠券推广</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #4361ee;
            --primary-hover: #3a56d4;
            --secondary-color: #7209b7;
            --accent-color: #f72585;
            --text-color: #2b2d42;
            --light-text: #6c757d;
            --background: #f8f9fa;
            --card-bg: #ffffff;
            --border-radius: 16px;
            --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            --gradient-primary: linear-gradient(135deg, #4361ee, #3a0ca3);
            --gradient-secondary: linear-gradient(135deg, #7209b7, #f72585);
            --gradient-card: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(247, 37, 133, 0.05));
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--background);
            padding-bottom: 50px;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(67, 97, 238, 0.05) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(247, 37, 133, 0.05) 0%, transparent 20%);
            background-attachment: fixed;
            overflow-x: hidden;
            perspective: 1000px;
        }
        
        /* 视差背景效果 */
        .parallax-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .parallax-bg .shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.2;
            filter: blur(60px);
        }
        
        .parallax-bg .shape-1 {
            background: var(--primary-color);
            width: 300px;
            height: 300px;
            top: 10%;
            left: -100px;
        }
        
        .parallax-bg .shape-2 {
            background: var(--accent-color);
            width: 400px;
            height: 400px;
            bottom: -150px;
            right: -150px;
        }
        
        .parallax-bg .shape-3 {
            background: var(--secondary-color);
            width: 200px;
            height: 200px;
            top: 40%;
            right: 10%;
        }
        
        /* 智能光标追踪光效 */
        .cursor-glow {
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(67, 97, 238, 0.15) 0%, rgba(67, 97, 238, 0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        header {
            background: transparent;
            color: white;
            padding: 30px 0;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 100;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            padding-bottom: 50px;
            transform-style: preserve-3d;
            background-image: none;
            background-size: cover;
            background-blend-mode: overlay;
            position: relative;
        }
        
        header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(94, 70, 54, 0.2);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            z-index: -1;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
            position: relative;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 800;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateZ(20px);
            transition: var(--transition);
        }
        
        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 300;
            letter-spacing: 0.5px;
            transform: translateZ(10px);
            transition: var(--transition);
        }
        
        .search-bar {
            display: flex;
            margin: -25px auto 30px;
            max-width: 700px;
            position: relative;
            z-index: 1000;
        }
        
        .search-input {
            flex: 1;
            padding: 18px 25px;
            border: none;
            border-radius: var(--border-radius);
            font-size: 16px;
            outline: none;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: var(--box-shadow);
            transition: var(--transition);
            position: relative;
            z-index: 1000;
            pointer-events: auto;
        }
        
        .search-input:focus {
            box-shadow: 0 15px 35px rgba(67, 97, 238, 0.15);
        }
        
        .search-button {
            background: var(--gradient-secondary);
            color: white;
            border: none;
            margin-left: 10px;
            padding: 0 30px;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: var(--transition);
            box-shadow: var(--box-shadow);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            z-index: 1000;
            pointer-events: auto;
        }
        
        /* 按钮点击粒子特效 */
        .search-button .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .search-button .particle {
            position: absolute;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transition: transform 1s ease-out, opacity 1s ease-out;
        }
        
        .search-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(247, 37, 133, 0.2);
        }
        
        .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin: 30px 0;
        }
        
        .category-item {
            background-color: var(--card-bg);
            border: none;
            border-radius: 30px;
            padding: 12px 24px;
            cursor: pointer;
            transition: var(--transition);
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .category-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            opacity: 0;
            z-index: -1;
            transition: var(--transition);
        }
        
        .category-item:hover {
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(67, 97, 238, 0.2);
        }
        
        .category-item:hover::before {
            opacity: 1;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-top: 30px;
            margin-bottom: 40px;
        }
        
        @media (max-width: 1200px) {
            .product-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
        }
        
        @media (max-width: 992px) {
            .product-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
        }
        
        /* 强制手机端显示两列 */
        @media (max-width: 767px) {
            .product-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr) !important; /* 强制两列 */
                gap: 10px;
                width: 100%;
            }
            
            .product-card {
                width: 100% !important;
                margin: 0 !important;
                min-height: auto;
            }
            
            .container {
                padding: 0 10px;
                width: 100%;
            }
        }
        
        @media (max-width: 480px) {
            .product-grid {
                grid-template-columns: repeat(2, 1fr) !important; /* 再次确保两列 */
                gap: 8px;
            }
        }
        
        @media (max-width: 375px) {
            .product-grid {
                grid-template-columns: repeat(2, 1fr) !important; /* 最小屏幕也确保两列 */
                gap: 6px;
            }
        }
        
        /* 骨架屏加载动画 */
        .skeleton-card {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
            position: relative;
            height: 450px;
        }
        
        .skeleton-image {
            width: 100%;
            height: 280px;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        
        .skeleton-content {
            padding: 25px;
        }
        
        .skeleton-title {
            height: 20px;
            margin-bottom: 15px;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
        }
        
        .skeleton-price {
            height: 30px;
            width: 60%;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
        }
        
        .skeleton-button {
            height: 45px;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: var(--border-radius);
        }
        
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        .product-card {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            transition: var(--transition);
            overflow: hidden;
            height: 100%;
            transform: translateZ(0);
            position: relative;
            cursor: pointer;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        /* 添加卡片链接覆盖层 */
        .card-link {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
        
        /* 确保按钮仍然可点击 */
        .buy-button {
            position: relative;
            z-index: 11;
        }
        
        .product-image-container {
            height: 220px;
            overflow: hidden;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            position: relative;
        }
        
        .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image {
            transform: scale(1.05);
        }
        
        /* 调整手机端商品图片大小 */
        @media (max-width: 767px) {
            .product-image-container {
                height: 160px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .product-image {
                width: 70%; /* 将图片宽度调整为容器的70% */
                height: auto;
                max-height: 90%;
                object-fit: contain;
            }
        }
        
        @media (max-width: 480px) {
            .product-image-container {
                height: 140px;
            }
            
            .product-image {
                width: 75%; /* 小屏幕上稍微调大到75% */
                max-height: 90%;
            }
        }
        
        @media (max-width: 375px) {
            .product-image {
                width: 80%; /* 最小屏幕上调整到80% */
            }
            
            .product-image-container {
                height: 130px;
            }
        }
        
        .discount-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--gradient-secondary);
            color: white;
            padding: 8px 15px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: bold;
            z-index: 10;
            box-shadow: 0 5px 15px rgba(247, 37, 133, 0.3);
        }
        
        .product-info {
            padding: 25px;
            background: var(--gradient-card);
            position: relative;
            z-index: 1;
        }
        
        .product-title {
            font-size: 1rem;
            height: 3em;
            overflow: hidden;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-weight: 600;
            color: var(--text-color);
        }
        
        .price-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .prices {
            display: flex;
            flex-direction: column;
        }
        
        .original-price {
            color: var(--light-text);
            text-decoration: line-through;
            font-size: 0.9rem;
        }
        
        .current-price {
            color: var(--accent-color);
            font-size: 1.5rem;
            font-weight: 800;
        }
        
        .discount-tag {
            background-color: rgba(247, 37, 133, 0.1);
            color: var(--accent-color);
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
        }
        
        .buy-button {
            display: block;
            width: 100%;
            background: var(--gradient-secondary);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: var(--transition);
            text-align: center;
            text-decoration: none;
            box-shadow: 0 8px 20px rgba(247, 37, 133, 0.2);
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .buy-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            opacity: 0;
            z-index: -1;
            transition: var(--transition);
        }
        
        .buy-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(247, 37, 133, 0.3);
        }
        
        .buy-button:hover::after {
            opacity: 1;
        }
        
        .buy-button i {
            margin-right: 8px;
        }
        
        .pagination-container {
            display: flex;
            justify-content: center;
            margin: 30px 0 50px;
            flex-wrap: wrap;
        }
        
        .page-button {
            background: white;
            border: 1px solid #e0e0e0;
            color: var(--text-color);
            padding: 8px 15px;
            margin: 0 5px;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
            font-weight: 500;
        }
        
        .page-button:hover {
            background: var(--gradient-primary);
            color: white;
            border-color: transparent;
        }
        
        .page-button.active {
            background: var(--gradient-primary);
            color: white;
            border-color: transparent;
        }
        
        @media (max-width: 767px) {
            .pagination-container {
                margin: 20px 0 40px;
            }
            
            .page-button {
                padding: 6px 12px;
                margin: 0 3px;
                font-size: 14px;
            }
        }
        
        #loading-spinner {
            display: none;
            text-align: center;
            margin: 40px 0;
        }
        
        .spinner {
            border: 4px solid rgba(67, 97, 238, 0.1);
            border-radius: 50%;
            border-top: 4px solid var(--primary-color);
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error-message {
            text-align: center;
            padding: 30px;
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            color: var(--accent-color);
            margin: 30px 0;
            border: 1px solid rgba(247, 37, 133, 0.1);
            box-shadow: var(--box-shadow);
        }
        
        .loading {
            text-align: center;
            padding: 50px 0;
            font-size: 1.2rem;
            color: var(--light-text);
        }
        
        /* 空状态样式 */
        .empty-state {
            text-align: center;
            padding: 70px 20px;
            background: var(--gradient-card);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }
        
        .empty-icon {
            font-size: 5rem;
            color: #d1d5db;
            margin-bottom: 25px;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        
        .empty-text {
            color: var(--light-text);
            font-size: 1.2rem;
            font-weight: 300;
        }
        
        /* 底部样式 */
        footer {
            background: var(--gradient-primary);
            text-align: center;
            padding: 30px 0;
            margin-top: 70px;
            color: white;
            clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
            padding-top: 80px;
            position: relative;
            overflow: hidden;
        }
        
        footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 40%, transparent 50%);
            animation: shine 6s infinite linear;
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .footer-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .product-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
            
            .product-image-container {
                height: 200px;
            }
            
            .product-title {
                font-size: 0.9rem;
            }
            
            .current-price {
                font-size: 1.2rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .search-input {
                padding: 15px 20px;
            }
            
            .search-button {
                padding: 0 20px;
            }
            
            .category-item {
                padding: 10px 18px;
                font-size: 0.85rem;
            }
            
            .buy-button {
                padding: 12px;
                font-size: 0.9rem;
            }
            
            .discount-badge {
                font-size: 0.75rem;
                padding: 6px 10px;
            }
            
            .product-info {
                padding: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .product-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }
            
            .product-image-container {
                height: 220px;
            }
            
            .price-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .discount-tag {
                margin-top: 5px;
            }
            
            .page-button {
                padding: 10px 15px;
                font-size: 0.9rem;
            }
            
            header {
                padding-bottom: 60px;
            }
            
            .search-bar {
                margin-top: -30px;
            }
        }
    </style>
</head>
<body>
    <!-- 中国风装饰元素 -->
    <div class="chinese-ornament ornament-1"></div>
    <div class="chinese-ornament ornament-2"></div>
    <div class="chinese-ornament ornament-3"></div>
    
    <header>
        <div class="container">
            <h1 class="brush-text">淘宝优惠券推广</h1>
            <div class="subtitle">寻觅良品，惠享生活</div>
        </div>
    </header>

    <div class="container">
        <div class="search-bar">
            <input type="text" id="search-input" class="search-input" placeholder="搜索商品...">
            <button id="search-button" class="search-button">
                <i class="fas fa-search"></i> 搜索
                <div class="particles"></div>
            </button>
        </div>

        <!-- 古风引言 -->
        <div class="chinese-quote ink-wash chinese-border">
            <p>"君子藏器于身，待时而动。"</p>
            <span class="quote-author">——《周易》</span>
            <div class="seal"></div>
        </div>

        <div class="categories" id="categories-container">
            <!-- 分类将通过JavaScript动态加载 -->
        </div>

        <div id="loading-spinner">
            <div class="spinner"></div>
        </div>

        <div id="error-container"></div>

        <div class="product-grid" id="products-container">
            <!-- 骨架屏将在这里显示 -->
        </div>

        <div class="pagination-container" id="pagination-container">
            <!-- 分页按钮将通过JavaScript动态加载 -->
        </div>
    </div>

    <footer>
        <div class="container">
            <p class="footer-text brush-text">淘宝优惠券推广 - 品质生活，从心开始</p>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化变量
            let currentKeyword = '';
            let currentPage = 1;
            let isLoading = false;
            
            // 智能光标追踪光效
            const cursorGlow = document.querySelector('.cursor-glow');
            document.addEventListener('mousemove', function(e) {
                cursorGlow.style.opacity = '1';
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
            
            document.addEventListener('mouseleave', function() {
                cursorGlow.style.opacity = '0';
            });
            
            // 视差背景效果
            document.addEventListener('mousemove', function(e) {
                const shapes = document.querySelectorAll('.parallax-bg .shape');
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 20;
                    const moveX = (x - 0.5) * speed;
                    const moveY = (y - 0.5) * speed;
                    shape.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
                });
                
                // 3D 标题效果
                const header = document.querySelector('header');
                const headerContent = header.querySelectorAll('h1, .subtitle');
                const rotateX = (y - 0.5) * 10;
                const rotateY = (x - 0.5) * 10;
                
                headerContent.forEach(el => {
                    el.style.transform = \`translateZ(20px) rotateX(\${-rotateX}deg) rotateY(\${rotateY}deg)\`;
                });
            });
            
            // 按钮点击粒子特效
            document.querySelectorAll('.search-button, .buy-button, .page-button').forEach(button => {
                button.addEventListener('click', createParticles);
            });
            
            function createParticles(e) {
                const particles = e.currentTarget.querySelector('.particles') || document.createElement('div');
                particles.className = 'particles';
                
                if (!e.currentTarget.querySelector('.particles')) {
                    e.currentTarget.appendChild(particles);
                }
                
                particles.innerHTML = '';
                
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('span');
                    particle.className = 'particle';
                    
                    const size = Math.random() * 6 + 2;
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 80 + 40;
                    
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    
                    particles.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.style.transform = \`translate(\${Math.cos(angle) * speed}px, \${Math.sin(angle) * speed}px)\`;
                        particle.style.opacity = '0';
                        
                        setTimeout(() => {
                            particle.remove();
                        }, 1000);
                    }, 0);
                }
            }
            
            // 显示骨架屏
            function showSkeletonLoading() {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = '';
                
                for (let i = 0; i < 8; i++) {
                    const skeletonCard = document.createElement('div');
                    skeletonCard.className = 'skeleton-card';
                    skeletonCard.innerHTML = \`
                        <div class="skeleton-image"></div>
                        <div class="skeleton-content">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-title" style="width: 70%"></div>
                            <div class="skeleton-price"></div>
                            <div class="skeleton-button"></div>
                        </div>
                    \`;
                    productsContainer.appendChild(skeletonCard);
                }
            }
            
            // 加载分类
            loadCategories();
            
            // 显示骨架屏并加载热门商品
            showSkeletonLoading();
            loadPopularProducts();
            
            // 搜索按钮点击事件
            document.getElementById('search-button').addEventListener('click', function() {
                searchProducts();
            });
            
            // 回车键搜索
            document.getElementById('search-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchProducts();
                }
            });
            
            // 加载分类列表
            async function loadCategories() {
                try {
                    const response = await fetch('/categories');
                    const categories = await response.json();
                    
                    const categoriesContainer = document.getElementById('categories-container');
                    categoriesContainer.innerHTML = '';
                    
                    categories.forEach(category => {
                        const categoryElement = document.createElement('div');
                        categoryElement.className = 'category-item';
                        categoryElement.textContent = category.name;
                        categoryElement.addEventListener('click', function() {
                            document.getElementById('search-input').value = category.keyword;
                            searchProducts(category.keyword);
                        });
                        categoriesContainer.appendChild(categoryElement);
                    });
                } catch (error) {
                    showError('加载分类失败，请刷新页面重试');
                    console.error('Error loading categories:', error);
                }
            }
            
            // 加载热门商品
            async function loadPopularProducts() {
                showLoading(true);
                try {
                    const response = await fetch('/popular');
                    const data = await response.json();
                    
                    if (data && data.result_list && data.result_list.map_data) {
                        renderProducts(data.result_list.map_data);
                        hideError();
                    } else {
                        showEmptyState('暂无热门商品');
                    }
                } catch (error) {
                    showError('加载商品失败，请刷新页面重试');
                    console.error('Error loading popular products:', error);
                } finally {
                    showLoading(false);
                }
            }
            
            // 搜索商品
            async function searchProducts(keyword) {
                keyword = keyword || document.getElementById('search-input').value.trim();
                
                if (!keyword) {
                    showError('请输入搜索关键词');
                    return;
                }
                
                currentKeyword = keyword;
                currentPage = 1;
                
                showLoading(true);
                try {
                    const response = await fetch(\`/search?keyword=\${encodeURIComponent(keyword)}&page=\${currentPage}&pageSize=20\`);
                    const data = await response.json();
                    
                    if (data && data.result_list && data.result_list.map_data && data.result_list.map_data.length > 0) {
                        renderProducts(data.result_list.map_data);
                        renderPagination(data.pagination);
                        hideError();
                    } else {
                        document.getElementById('products-container').innerHTML = '';
                        document.getElementById('pagination-container').innerHTML = '';
                        showEmptyState('没有找到相关商品，请尝试其他关键词');
                    }
                } catch (error) {
                    showError('搜索失败，请重试');
                    console.error('Error searching products:', error);
                } finally {
                    showLoading(false);
                }
            }
            
            // 加载指定页码的商品
            async function loadPage(page) {
                if (!currentKeyword) return;
                
                currentPage = page;
                
                showLoading(true);
                try {
                    const response = await fetch(\`/search?keyword=\${encodeURIComponent(currentKeyword)}&page=\${page}&pageSize=20\`);
                    const data = await response.json();
                    
                    if (data && data.result_list && data.result_list.map_data) {
                        renderProducts(data.result_list.map_data);
                        renderPagination(data.pagination);
                        // 滚动到顶部
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        showError('加载商品失败');
                    }
                } catch (error) {
                    showError('加载商品失败，请重试');
                    console.error('Error loading page:', error);
                } finally {
                    showLoading(false);
                }
            }
            
            // 渲染商品列表
            function renderProducts(products) {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = '';
                
                products.forEach(product => {
                    // 提取商品信息
                    const title = product.item_basic_info.title;
                    const imageUrl = product.item_basic_info.white_image || product.item_basic_info.pict_url;
                    const originalPrice = parseFloat(product.price_promotion_info.zk_final_price);
                    const finalPrice = product.price_promotion_info.final_promotion_price 
                        ? parseFloat(product.price_promotion_info.final_promotion_price) 
                        : originalPrice;
                    const discount = Math.round((originalPrice - finalPrice) * 100) / 100;
                    const discountPercent = Math.round((discount / originalPrice) * 100);
                    const clickUrl = product.publish_info.click_url || '';
                    
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    
                    // 添加卡片点击事件
                    productCard.addEventListener('click', function(e) {
                        // 如果点击的是购买按钮，不执行默认行为
                        if (e.target.closest('.buy-button')) {
                            return;
                        }
                        // 否则打开链接
                        window.open(clickUrl, '_blank');
                    });
                    
                    productCard.innerHTML = \`
                        <div class="product-image-container">
                            <img src="\${imageUrl}" alt="\${title}" class="product-image" onerror="this.src='https://via.placeholder.com/250x250?text=无图片'">
                            \${discount > 0 ? \`<div class="discount-badge">\${discountPercent}% OFF</div>\` : ''}
                        </div>
                        <div class="product-info">
                            <div class="product-title">\${title}</div>
                            <div class="price-container">
                                <div class="prices">
                                    <span class="original-price">¥\${originalPrice}</span>
                                    <span class="current-price">¥\${finalPrice}</span>
                                </div>
                                \${discount > 0 ? \`<span class="discount-tag">省¥\${discount}</span>\` : ''}
                            </div>
                            <a href="\${clickUrl}" target="_blank" class="buy-button"><i class="fas fa-shopping-cart"></i> 领券购买</a>
                        </div>
                    \`;
                    
                    productsContainer.appendChild(productCard);
                });
            }
            
            // 显示空状态
            function showEmptyState(message) {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = \`
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-search"></i></div>
                        <p class="empty-text">\${message}</p>
                    </div>
                \`;
            }
            
            // 渲染分页
            function renderPagination(pagination) {
                if (!pagination) return;
                
                const paginationContainer = document.getElementById('pagination-container');
                paginationContainer.innerHTML = '';
                
                const totalPages = pagination.total_pages;
                const currentPage = pagination.current_page;
                
                if (totalPages <= 1) return;
                
                // 上一页按钮
                if (currentPage > 1) {
                    const prevButton = document.createElement('button');
                    prevButton.className = 'page-button';
                    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    prevButton.addEventListener('click', () => loadPage(currentPage - 1));
                    paginationContainer.appendChild(prevButton);
                }
                
                // 页码按钮
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                
                if (endPage - startPage < 4) {
                    startPage = Math.max(1, endPage - 4);
                }
                
                for (let i = startPage; i <= endPage; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.className = 'page-button' + (i === currentPage ? ' active' : '');
                    pageButton.textContent = i;
                    pageButton.addEventListener('click', () => loadPage(i));
                    paginationContainer.appendChild(pageButton);
                }
                
                // 下一页按钮
                if (currentPage < totalPages) {
                    const nextButton = document.createElement('button');
                    nextButton.className = 'page-button';
                    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    nextButton.addEventListener('click', () => loadPage(currentPage + 1));
                    paginationContainer.appendChild(nextButton);
                }
            }
            
            // 显示或隐藏加载状态
            function showLoading(show) {
                const spinner = document.getElementById('loading-spinner');
                spinner.style.display = show ? 'block' : 'none';
            }
            
            // 显示错误信息
            function showError(message) {
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = \`<div class="error-message"><i class="fas fa-exclamation-circle"></i> \${message}</div>\`;
            }
            
            // 隐藏错误信息
            function hideError() {
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = '';
            }
        });
    </script>
</body>
</html>
`; 
