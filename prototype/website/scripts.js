document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // 关闭点击外部区域时的移动菜单
  document.addEventListener('click', function(event) {
    if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
  
  // 创建科技网格背景
  const createTechBackground = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const techBg = document.createElement('div');
      techBg.classList.add('tech-bg');
      
      // 创建网格线
      for (let i = 0; i < 10; i++) {
        const verticalLine = document.createElement('div');
        verticalLine.classList.add('grid-line', 'grid-line-vertical');
        verticalLine.style.left = `${i * 10}%`;
        verticalLine.style.opacity = Math.random() * 0.5;
        
        const horizontalLine = document.createElement('div');
        horizontalLine.classList.add('grid-line', 'grid-line-horizontal');
        horizontalLine.style.top = `${i * 10}%`;
        horizontalLine.style.opacity = Math.random() * 0.5;
        
        techBg.appendChild(verticalLine);
        techBg.appendChild(horizontalLine);
      }
      
      // 创建粒子
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        
        techBg.appendChild(particle);
      }
      
      section.appendChild(techBg);
    });
  };
  
  // 3D卡片效果
  const initTiltEffect = () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // 计算倾斜角度 -15度到15度
        const tiltX = (0.5 - yPercent) * 15;
        const tiltY = (xPercent - 0.5) * 15;
        
        // 应用变换
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        
        // 光泽效果
        const glare = this.querySelector('.card-glare') || document.createElement('div');
        if (!this.querySelector('.card-glare')) {
          glare.classList.add('card-glare');
          this.appendChild(glare);
        }
        
        glare.style.opacity = '0.15';
        glare.style.transform = `translate(${xPercent * 100}%, ${yPercent * 100}%)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        const glare = this.querySelector('.card-glare');
        if (glare) {
          glare.style.opacity = '0';
        }
      });
      
      // 添加激光边框类
      card.classList.add('border-gradient');
    });
  };
  
  // 轮播图效果增强
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    
    // 为标题添加动态效果
    carouselItems.forEach(item => {
      const title = item.querySelector('h2');
      if (title) {
        const text = title.textContent;
        title.innerHTML = '';
        
        const textSpan = document.createElement('span');
        textSpan.classList.add('text-gradient');
        textSpan.textContent = text;
        
        title.appendChild(textSpan);
      }
    });
    
    // 自动轮播
    let autoSlide = setInterval(nextSlide, 6000);
    
    // 下一张轮播图
    function nextSlide() {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }
    
    // 上一张轮播图
    function prevSlide() {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      updateCarousel();
    }
    
    // 更新轮播图位置
    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // 激活当前项动画
      carouselItems.forEach((item, index) => {
        if (index === currentIndex) {
          item.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animated');
          });
        } else {
          item.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('animated');
          });
        }
      });
    }
    
    // 初始化激活当前项
    updateCarousel();
    
    // 轮播图控制按钮
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, 6000);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, 6000);
      });
    }
    
    // 鼠标悬停暂停轮播
    carousel.addEventListener('mouseenter', function() {
      clearInterval(autoSlide);
    });
    
    carousel.addEventListener('mouseleave', function() {
      autoSlide = setInterval(nextSlide, 6000);
    });
    
    // 添加指示器
    const createIndicators = () => {
      const indicators = document.createElement('div');
      indicators.classList.add('carousel-indicators');
      
      for (let i = 0; i < itemCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        
        indicators.appendChild(indicator);
      }
      
      carousel.appendChild(indicators);
    };
    
    createIndicators();
  }
  
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // 关闭移动菜单
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
  
  // 页面滚动动画效果
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('animated');
      }
    });
  }
  
  // 视差滚动效果
  function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const speed = element.getAttribute('data-speed') || 0.5;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  }
  
  // 添加霓虹文字特效
  function addGlowText() {
    const titles = document.querySelectorAll('.section-title h2, .page-title h1, .card-title');
    
    titles.forEach(title => {
      title.classList.add('glow-text');
    });
  }
  
  // 添加CSS类
  function addStyleClasses() {
    // 给区块添加玻璃效果
    document.querySelectorAll('.section:nth-child(even)').forEach(section => {
      section.classList.add('bg-glass');
    });
    
    // 给按钮添加霓虹边框
    document.querySelectorAll('.btn-outline').forEach(btn => {
      btn.classList.add('border-gradient');
    });
  }
  
  // 初始化动画
  window.addEventListener('scroll', () => {
    checkScroll();
    parallaxScroll();
  });
  
  // 动态更新当前年份
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
  
  // 初始化函数调用
  createTechBackground();
  initTiltEffect();
  addGlowText();
  addStyleClasses();
  checkScroll(); // 首次加载检查
  
  // 添加页面加载动画
  window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    
    const loaderContent = document.createElement('div');
    loaderContent.classList.add('loader-content');
    
    const loaderLogo = document.createElement('div');
    loaderLogo.classList.add('loader-logo');
    loaderLogo.innerHTML = '<span class="text-gradient">科技创新</span>';
    
    const loaderProgress = document.createElement('div');
    loaderProgress.classList.add('loader-progress');
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    loaderProgress.appendChild(progressBar);
    
    loaderContent.appendChild(loaderLogo);
    loaderContent.appendChild(loaderProgress);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    progressBar.style.width = '100%';
    
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  });
  
  // 添加动态光标效果
  const addCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    document.body.appendChild(cursorInner);
    
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.addEventListener('mousedown', () => {
      cursor.classList.add('click');
      cursorInner.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('click');
      cursorInner.classList.remove('click');
    });
    
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorInner.classList.add('hover');
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorInner.classList.remove('hover');
      });
    });
  };
  
  // 仅在非移动设备上添加自定义光标
  if (window.innerWidth > 768) {
    addCustomCursor();
  }
}); 