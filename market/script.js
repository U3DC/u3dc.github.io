// 语言数据
const translations = {
    'zh-TW': {
        title: '遊戲卡帶收納盒定制',
        subtitle: '個性化定制您的專屬收納盒',
        previewTitle: '產品預覽',
        previewText: '選擇選項查看效果',
        customizeTitle: '定制選項',
        frameMaterialLabel: '框架材質類型',
        trayMaterialLabel: '托盤/抽屜材質類型',
        frameColorLabel: '框架顏色',
        trayColorLabel: '托盤/抽屜顏色',
        cardTypeLabel: '托盤/抽屜類型',
        currentSpecs: '當前規格',
        specFrame: '框架：',
        specTray: '托盤：',
        specFrameColor: '框架顏色：',
        specTrayColor: '托盤顏色：',
        specCardType: '卡帶類型：',
        footerText: '遊戲卡帶收納盒定制系統',
        frameStandard: '標準',
        frameCarbon: '碳纖維',
        trayStandard: '標準',
        trayCarbon: '碳纖維',
        colorDarkBlueGray: '深藍灰',
        colorRed: '紅色',
        colorBlue: '藍色',
        colorGreen: '綠色',
        colorOrange: '橙色',
        colorPurple: '紫色',
        colorCyan: '青色',
        colorDarkGray: '深灰',
        accessoryTray: '配件托盤',
        adapterTray: '無線適配器托盤',
        galleryText: '實拍效果圖',
        customizeBtn: '立即定制',
        emailSubject: '遊戲卡帶收納盒定制需求',
        emailBodyPrefix: '您好，我想定制以下規格的遊戲卡帶收納盒：\n\n'
    },
    'zh-CN': {
        title: '游戏卡带收纳盒定制',
        subtitle: '个性化定制您的专属收纳盒',
        previewTitle: '产品预览',
        previewText: '选择选项查看效果',
        customizeTitle: '定制选项',
        frameMaterialLabel: '框架材质类型',
        trayMaterialLabel: '托盘/抽屉材质类型',
        frameColorLabel: '框架颜色',
        trayColorLabel: '托盘/抽屉颜色',
        cardTypeLabel: '托盘/抽屉类型',
        currentSpecs: '当前规格',
        specFrame: '框架：',
        specTray: '托盘：',
        specFrameColor: '框架颜色：',
        specTrayColor: '托盘颜色：',
        specCardType: '卡带类型：',
        footerText: '游戏卡带收纳盒定制系统',
        frameStandard: '标准',
        frameCarbon: '碳纤维',
        trayStandard: '标准',
        trayCarbon: '碳纤维',
        colorDarkBlueGray: '深蓝灰',
        colorRed: '红色',
        colorBlue: '蓝色',
        colorGreen: '绿色',
        colorOrange: '橙色',
        colorPurple: '紫色',
        colorCyan: '青色',
        colorDarkGray: '深灰',
        accessoryTray: '配件托盘',
        adapterTray: '无线适配器托盘',
        galleryText: '实拍效果图',
        customizeBtn: '立即定制',
        emailSubject: '游戏卡带收纳盒定制需求',
        emailBodyPrefix: '您好，我想定制以下规格的游戏卡带收纳盒：\n\n'
    }
};

// 当前语言（默认为繁体中文）
let currentLang = 'zh-TW';

// EmailJS配置（需要替换为您的实际配置）
const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',      // 替换为您的EmailJS Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // 替换为您的EmailJS Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'       // 替换为您的EmailJS Public Key
};

// 收件人邮箱
const RECIPIENT_EMAIL = 'tuqibiao@gmail.com';

// 实拍效果图数组（图片放在 images 目录下，可以替换为实际图片文件名）
const galleryImages = [
    'images/product-1.jpg',
    'images/product-2.jpg',
    'images/product-3.jpg',
    'images/product-4.jpg'
];

// 轮播相关变量
let currentSlideIndex = 0;
let gallerySlides, galleryIndicators, galleryPrevBtn, galleryNextBtn;

// 产品配置数据
const productConfig = {
    frameType: 'standard',
    trayType: 'standard',
    frameColor: '#2C3E50',
    trayColor: '#2C3E50',
    cardType: 'gba'
};

// 选项映射（根据语言动态获取）
function getFrameTypes() {
    return {
        standard: translations[currentLang].frameStandard,
        carbon: translations[currentLang].frameCarbon
    };
}

function getTrayTypes() {
    return {
        standard: translations[currentLang].trayStandard,
        carbon: translations[currentLang].trayCarbon
    };
}

const colorNames = {
    '#2C3E50': { 'zh-TW': '深藍灰', 'zh-CN': '深蓝灰' },
    '#E74C3C': { 'zh-TW': '紅色', 'zh-CN': '红色' },
    '#3498DB': { 'zh-TW': '藍色', 'zh-CN': '蓝色' },
    '#2ECC71': { 'zh-TW': '綠色', 'zh-CN': '绿色' },
    '#F39C12': { 'zh-TW': '橙色', 'zh-CN': '橙色' },
    '#9B59B6': { 'zh-TW': '紫色', 'zh-CN': '紫色' },
    '#1ABC9C': { 'zh-TW': '青色', 'zh-CN': '青色' },
    '#34495E': { 'zh-TW': '深灰', 'zh-CN': '深灰' }
};

function getCardTypes() {
    return {
        'gba': 'GBA',
        'switch': 'Switch',
        '3ds-nds': '3DS/NDS',
        'gb-gbc': 'GB/GBC',
        'psp': 'PSP',
        'accessory': translations[currentLang].accessoryTray,
        'adapter': translations[currentLang].adapterTray
    };
}

// DOM元素
let frameTypeSelect, trayTypeSelect, frameColorButtons, trayColorButtons, cardTypeRadios;
let previewFrame, previewTray;
let specFrame, specTray, specFrameColor, specTrayColor, specCardType;
let langBtn, langMenu;

// 初始化
function init() {
    // 获取DOM元素
    frameTypeSelect = document.getElementById('frameType');
    trayTypeSelect = document.getElementById('trayType');
    frameColorButtons = document.querySelectorAll('#frameColorOptions .color-btn');
    trayColorButtons = document.querySelectorAll('#trayColorOptions .color-btn');
    cardTypeRadios = document.querySelectorAll('input[name="cardType"]');
    previewFrame = document.getElementById('previewFrame');
    previewTray = document.getElementById('previewTray');
    specFrame = document.getElementById('specFrame');
    specTray = document.getElementById('specTray');
    specFrameColor = document.getElementById('specFrameColor');
    specTrayColor = document.getElementById('specTrayColor');
    specCardType = document.getElementById('specCardType');
    langBtn = document.getElementById('langBtn');
    langMenu = document.getElementById('langMenu');
    const customizeBtn = document.getElementById('customizeBtn');
    
    // 绑定事件监听器
    frameTypeSelect.addEventListener('change', handleFrameTypeChange);
    trayTypeSelect.addEventListener('change', handleTrayTypeChange);
    
    frameColorButtons.forEach(btn => {
        btn.addEventListener('click', handleFrameColorChange);
    });
    
    trayColorButtons.forEach(btn => {
        btn.addEventListener('click', handleTrayColorChange);
    });
    
    cardTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleCardTypeChange);
    });
    
    // 语言切换
    langBtn.addEventListener('click', toggleLangMenu);
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', handleLangChange);
    });
    
    // 点击外部关闭语言菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            langMenu.classList.remove('show');
        }
    });
    
    // 初始化语言
    updateLanguage();
    
    // 初始化预览
    updatePreview();
    updateSpecs();
    
    // 初始化图片轮播
    initGallery();
    
    // 初始化EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
        console.warn('EmailJS未加载，请检查网络连接或CDN链接');
    }
    
    // 绑定立即定制按钮事件
    if (customizeBtn) {
        customizeBtn.addEventListener('click', handleCustomizeClick);
    } else {
        console.error('立即定制按钮未找到');
    }
}

// 切换语言菜单
function toggleLangMenu(e) {
    e.stopPropagation();
    langMenu.classList.toggle('show');
}

// 处理语言变化
function handleLangChange(e) {
    const lang = e.target.dataset.lang;
    if (lang && lang !== currentLang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        updateLanguage();
        updateSpecs();
        updateCardTypeLabels();
    }
    langMenu.classList.remove('show');
}

// 更新语言
function updateLanguage() {
    const t = translations[currentLang];
    
    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // 更新带 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (t[key]) {
            el.title = t[key];
        }
    });
    
    // 更新select选项
    updateSelectOptions();
    
    // 更新语言按钮文本
    langBtn.textContent = currentLang === 'zh-TW' ? '語言' : '语言';
}

// 更新select选项
function updateSelectOptions() {
    const t = translations[currentLang];
    
    // 更新框架类型选项
    frameTypeSelect.querySelector('option[value="standard"]').textContent = t.frameStandard;
    frameTypeSelect.querySelector('option[value="carbon"]').textContent = t.frameCarbon;
    
    // 更新托盘类型选项
    trayTypeSelect.querySelector('option[value="standard"]').textContent = t.trayStandard;
    trayTypeSelect.querySelector('option[value="carbon"]').textContent = t.trayCarbon;
}

// 更新游戏卡类型标签
function updateCardTypeLabels() {
    const t = translations[currentLang];
    const accessoryLabel = document.querySelector('input[value="accessory"]').nextElementSibling;
    const adapterLabel = document.querySelector('input[value="adapter"]').nextElementSibling;
    
    if (accessoryLabel) accessoryLabel.textContent = t.accessoryTray;
    if (adapterLabel) adapterLabel.textContent = t.adapterTray;
}

// 处理框架类型变化
function handleFrameTypeChange(e) {
    productConfig.frameType = e.target.value;
    updatePreview();
    updateSpecs();
}

// 处理托盘类型变化
function handleTrayTypeChange(e) {
    productConfig.trayType = e.target.value;
    updatePreview();
    updateSpecs();
}

// 处理框架颜色变化
function handleFrameColorChange(e) {
    const selectedColor = e.target.dataset.color;
    productConfig.frameColor = selectedColor;
    
    // 更新框架颜色按钮状态
    frameColorButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.color === selectedColor) {
            btn.classList.add('active');
        }
    });
    
    updatePreview();
    updateSpecs();
}

// 处理托盘颜色变化
function handleTrayColorChange(e) {
    const selectedColor = e.target.dataset.color;
    productConfig.trayColor = selectedColor;
    
    // 更新托盘颜色按钮状态
    trayColorButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.color === selectedColor) {
            btn.classList.add('active');
        }
    });
    
    updatePreview();
    updateSpecs();
}

// 处理游戏卡类型变化
function handleCardTypeChange(e) {
    if (e.target.checked) {
        productConfig.cardType = e.target.value;
        updatePreview();
        updateSpecs();
    }
}

// 更新预览
function updatePreview() {
    // 更新框架颜色 - 框架作为外框
    previewFrame.style.borderColor = productConfig.frameColor;
    previewFrame.style.backgroundColor = adjustColorBrightness(productConfig.frameColor, 0.98);
    
    // 根据框架材质类型调整样式
    if (productConfig.frameType === 'carbon') {
        // 碳纤维效果：添加纹理样式
        previewFrame.style.borderWidth = '12px';
        previewFrame.style.backgroundImage = 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)';
        previewFrame.style.backgroundSize = '20px 20px';
        previewFrame.style.backgroundPosition = '0 0, 10px 10px';
        previewFrame.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
    } else {
        // 标准材质
        previewFrame.style.borderWidth = '10px';
        previewFrame.style.backgroundImage = 'none';
        previewFrame.style.boxShadow = 'none';
    }
    
    // 更新托盘颜色和材质 - 托盘是九宫格
    const trayBaseColor = adjustColorBrightness(productConfig.trayColor, 0.85);
    const trayCellColor = adjustColorBrightness(productConfig.trayColor, 0.7);
    
    if (productConfig.trayType === 'carbon') {
        // 碳纤维效果
        previewTray.style.backgroundColor = trayBaseColor;
        previewTray.style.backgroundImage = 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)';
        previewTray.style.backgroundSize = '15px 15px';
        previewTray.style.backgroundPosition = '0 0, 7.5px 7.5px';
        previewTray.style.backgroundBlendMode = 'overlay';
    } else {
        // 标准材质
        previewTray.style.backgroundColor = trayBaseColor;
        previewTray.style.backgroundImage = 'none';
    }
    
    // 更新九宫格单元格颜色
    const trayCells = document.querySelectorAll('.tray-cell');
    trayCells.forEach(cell => {
        if (productConfig.trayType === 'carbon') {
            cell.style.backgroundColor = trayCellColor;
            cell.style.backgroundImage = 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%)';
            cell.style.backgroundSize = '10px 10px';
        } else {
            cell.style.backgroundColor = trayCellColor;
            cell.style.backgroundImage = 'none';
        }
    });
    
    // 根据游戏卡类型调整托盘样式
    adjustTrayForCardType();
}

// 根据游戏卡类型调整托盘
function adjustTrayForCardType() {
    // 托盘现在铺满框架，不需要根据类型调整圆角
    // 保持托盘铺满框架的样式
}

// 更新规格显示
function updateSpecs() {
    const frameTypes = getFrameTypes();
    const trayTypes = getTrayTypes();
    
    specFrame.textContent = frameTypes[productConfig.frameType];
    specTray.textContent = trayTypes[productConfig.trayType];
    specFrameColor.textContent = colorNames[productConfig.frameColor][currentLang];
    specTrayColor.textContent = colorNames[productConfig.trayColor][currentLang];
    
    // 更新卡带类型
    const cardTypes = getCardTypes();
    specCardType.textContent = cardTypes[productConfig.cardType];
}

// 调整颜色亮度
function adjustColorBrightness(hex, percent) {
    // 移除 # 号
    hex = hex.replace('#', '');
    
    // 转换为 RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // 调整亮度
    const newR = Math.min(255, Math.round(r * percent));
    const newG = Math.min(255, Math.round(g * percent));
    const newB = Math.min(255, Math.round(b * percent));
    
    // 转换回十六进制
    return `rgb(${newR}, ${newG}, ${newB})`;
}

// 初始化图片轮播
function initGallery() {
    gallerySlides = document.getElementById('gallerySlides');
    galleryIndicators = document.getElementById('galleryIndicators');
    galleryPrevBtn = document.getElementById('galleryPrev');
    galleryNextBtn = document.getElementById('galleryNext');
    
    // 创建图片幻灯片
    galleryImages.forEach((imageUrl, index) => {
        // 创建幻灯片
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `實拍效果圖 ${index + 1}`;
        slide.appendChild(img);
        gallerySlides.appendChild(slide);
        
        // 创建指示器
        const indicator = document.createElement('button');
        indicator.className = 'gallery-indicator';
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.setAttribute('data-index', index);
        indicator.addEventListener('click', () => goToSlide(index));
        galleryIndicators.appendChild(indicator);
    });
    
    // 绑定左右箭头事件
    galleryPrevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    galleryNextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
    
    // 自动播放（可选）
    // setInterval(() => goToSlide(currentSlideIndex + 1), 5000);
}

// 切换到指定幻灯片
function goToSlide(index) {
    const totalSlides = galleryImages.length;
    
    // 处理循环
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    
    currentSlideIndex = index;
    
    // 更新幻灯片位置
    gallerySlides.style.transform = `translateX(-${index * 100}%)`;
    
    // 更新指示器
    const indicators = galleryIndicators.querySelectorAll('.gallery-indicator');
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 处理立即定制按钮点击
async function handleCustomizeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    try {
        const t = translations[currentLang];
        const frameTypes = getFrameTypes();
        const trayTypes = getTrayTypes();
        const cardTypes = getCardTypes();
        
        // 收集当前定制规格信息
        const specs = [
            `${t.specFrame}${frameTypes[productConfig.frameType]}`,
            `${t.specTray}${trayTypes[productConfig.trayType]}`,
            `${t.specFrameColor}${colorNames[productConfig.frameColor][currentLang]}`,
            `${t.specTrayColor}${colorNames[productConfig.trayColor][currentLang]}`,
            `${t.specCardType}${cardTypes[productConfig.cardType]}`
        ];
        
        // 构建邮件内容
        const emailBody = t.emailBodyPrefix + specs.join('\n') + '\n\n';
        
        // 检查EmailJS是否已配置
        if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
            EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // EmailJS未配置，使用mailto作为备选方案
            alert('邮件服务未配置，请先配置EmailJS。\n\n正在打开邮件客户端...');
            const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
            return;
        }
        
        // 禁用按钮，显示发送中状态
        const btn = e.target;
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = currentLang === 'zh-TW' ? '發送中...' : '发送中...';
        
        // 使用EmailJS发送邮件
        if (typeof emailjs !== 'undefined') {
            try {
                const templateParams = {
                    to_email: RECIPIENT_EMAIL,
                    subject: t.emailSubject,
                    message: emailBody,
                    frame_type: frameTypes[productConfig.frameType],
                    tray_type: trayTypes[productConfig.trayType],
                    frame_color: colorNames[productConfig.frameColor][currentLang],
                    tray_color: colorNames[productConfig.trayColor][currentLang],
                    card_type: cardTypes[productConfig.cardType]
                };
                
                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );
                
                // 发送成功
                btn.textContent = currentLang === 'zh-TW' ? '發送成功！' : '发送成功！';
                btn.style.background = 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)';
                alert(currentLang === 'zh-TW' ? '定制需求已成功發送！我們會盡快與您聯繫。' : '定制需求已成功发送！我们会尽快与您联系。');
                
                // 2秒后恢复按钮
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 2000);
                
            } catch (error) {
                console.error('EmailJS发送失败：', error);
                btn.disabled = false;
                btn.textContent = originalText;
                
                // 发送失败，使用mailto作为备选方案
                const shouldUseMailto = confirm(
                    currentLang === 'zh-TW' 
                        ? '郵件發送失敗，是否使用郵件客戶端發送？\n\n點擊"確定"打開郵件客戶端。'
                        : '邮件发送失败，是否使用邮件客户端发送？\n\n点击"确定"打开邮件客户端。'
                );
                
                if (shouldUseMailto) {
                    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                    window.location.href = mailtoLink;
                } else {
                    // 复制到剪贴板
                    const emailContent = `收件人：${RECIPIENT_EMAIL}\n主题：${t.emailSubject}\n\n${emailBody}`;
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(emailContent).then(() => {
                            alert(currentLang === 'zh-TW' ? '郵件內容已複製到剪貼板！' : '邮件内容已复制到剪贴板！');
                        }).catch(() => {
                            prompt(currentLang === 'zh-TW' ? '請複製以下內容：' : '请复制以下内容：', emailContent);
                        });
                    } else {
                        prompt(currentLang === 'zh-TW' ? '請複製以下內容：' : '请复制以下内容：', emailContent);
                    }
                }
            }
        } else {
            // EmailJS未加载
            alert('邮件服务未加载，请检查网络连接。\n\n正在打开邮件客户端...');
            const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
        }
    } catch (error) {
        console.error('发送邮件时出错：', error);
        alert(currentLang === 'zh-TW' ? '發送郵件時出錯，請檢查控制台獲取詳細信息。' : '发送邮件时出错，请检查控制台获取详细信息。');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
