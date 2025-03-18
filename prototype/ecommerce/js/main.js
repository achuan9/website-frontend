document.addEventListener('DOMContentLoaded', function() {
    // Header滚动效果
    const header = document.getElementById('main-header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化检查

    // 搜索框控制
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');

    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.remove('d-none');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        setTimeout(() => {
            searchOverlay.querySelector('input').focus();
        }, 100);
    });

    searchClose.addEventListener('click', function() {
        searchOverlay.classList.add('d-none');
        document.body.style.overflow = '';
    });

    // 点击overlay外部关闭搜索
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.add('d-none');
            document.body.style.overflow = '';
        }
    });

    // 购物车侧边栏控制
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('cart-close');

    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.remove('d-none');
        setTimeout(() => {
            cartSidebar.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        setTimeout(() => {
            cartSidebar.classList.add('d-none');
            document.body.style.overflow = '';
        }, 300);
    });

    // 产品卡片效果
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            img.addEventListener('mouseenter', function() {
                card.querySelector('.product-actions').style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', function() {
                card.querySelector('.product-actions').style.opacity = '0';
            });
        }
    });

    // 初始化Bootstrap工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 初始化轮播图
    var productCarousel = document.querySelector('#product-carousel');
    if (productCarousel) {
        new bootstrap.Carousel(productCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // 延迟加载图片
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // 浏览器支持原生懒加载
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 回退方案 - 使用IntersectionObserver
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 