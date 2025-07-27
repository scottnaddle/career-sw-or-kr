// Help page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initFaqFunctionality();
    initUserGuide();
    initCompanySearch();
    initContactForm();
    initRemoteSupportForm();
});

// FAQ functionality
function initFaqFunctionality() {
    initFaqSearch();
    initFaqCategories();
}

function initFaqSearch() {
    const searchBtn = document.querySelector('.faq-search-btn');
    const searchInput = document.querySelector('.faq-search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performFaqSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performFaqSearch();
            }
        });
    }
    
    function performFaqSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h5').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (keyword === '' || question.includes(keyword) || answer.includes(keyword)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        if (keyword) {
            showNotification(`"${searchInput.value}" 검색 결과 ${visibleCount}건을 찾았습니다.`);
        } else {
            showNotification('전체 FAQ를 표시합니다.');
        }
    }
}

function initFaqCategories() {
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterFaqByCategory(category);
        });
    });
    
    function filterFaqByCategory(category) {
        const faqItems = document.querySelectorAll('.faq-item');
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        const categoryText = getCategoryText(category);
        showNotification(`${categoryText} 관련 FAQ ${visibleCount}건을 표시합니다.`);
    }
    
    function getCategoryText(category) {
        const categories = {
            'all': '전체',
            'membership': '회원가입',
            'application': '신청관련',
            'documents': '서류제출',
            'payment': '결제/수수료',
            'system': '시스템'
        };
        return categories[category] || '전체';
    }
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');
    
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = null;
        toggle.textContent = '▼';
    } else {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            item.querySelector('.faq-toggle').textContent = '▼';
        });
        
        // Open clicked FAQ item
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '▲';
    }
}

// User guide functionality
function initUserGuide() {
    const guideTabs = document.querySelectorAll('.guide-tab');
    const guidePanels = document.querySelectorAll('.guide-panel');
    
    guideTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            guideTabs.forEach(t => t.classList.remove('active'));
            guidePanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const guideType = this.getAttribute('data-guide');
            const targetPanel = document.getElementById(guideType);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Company search functionality
function initCompanySearch() {
    const searchBtn = document.querySelector('.company-search-btn');
    const searchInput = document.querySelector('.company-search-input');
    const regionFilter = document.querySelector('.region-filter');
    const sizeFilter = document.querySelector('.size-filter');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performCompanySearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performCompanySearch();
            }
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', performCompanySearch);
    }
    
    if (sizeFilter) {
        sizeFilter.addEventListener('change', performCompanySearch);
    }
    
    function performCompanySearch() {
        const keyword = searchInput.value.trim();
        const region = regionFilter.value;
        const size = sizeFilter.value;
        
        if (keyword.length > 0 && keyword.length < 2) {
            showNotification('검색어는 2자 이상 입력해주세요.');
            return;
        }
        
        // Simulate search
        let searchCriteria = [];
        if (keyword) searchCriteria.push(`회사명: "${keyword}"`);
        if (region !== 'all') searchCriteria.push(`지역: ${getRegionText(region)}`);
        if (size !== 'all') searchCriteria.push(`규모: ${getSizeText(size)}`);
        
        const criteriaText = searchCriteria.length > 0 ? searchCriteria.join(', ') : '전체';
        showNotification(`${criteriaText} 조건으로 회사를 검색합니다.`);
        
        // Here you would typically make an API call to search companies
        // For demo purposes, we'll just show a notification
    }
    
    function getRegionText(region) {
        const regions = {
            'seoul': '서울',
            'gyeonggi': '경기',
            'incheon': '인천',
            'busan': '부산',
            'daegu': '대구',
            'daejeon': '대전',
            'gwangju': '광주',
            'ulsan': '울산',
            'sejong': '세종'
        };
        return regions[region] || region;
    }
    
    function getSizeText(size) {
        const sizes = {
            'large': '대기업',
            'medium': '중견기업',
            'small': '중소기업',
            'startup': '스타트업'
        };
        return sizes[size] || size;
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Get form data
                const formData = new FormData(this);
                const inquiryData = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    category: formData.get('category'),
                    subject: formData.get('subject'),
                    content: formData.get('content')
                };
                
                // Simulate form submission
                showNotification('문의가 성공적으로 등록되었습니다. 영업일 기준 1-2일 내에 답변드리겠습니다.');
                this.reset();
            } else {
                showNotification('필수 항목을 모두 입력해주세요.');
            }
        });
    }
}

// Remote support form functionality
function initRemoteSupportForm() {
    const supportForm = document.querySelector('.support-form');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Check time preference
            const timeCheckboxes = this.querySelectorAll('input[name="time"]:checked');
            if (timeCheckboxes.length === 0) {
                showNotification('희망 시간을 하나 이상 선택해주세요.');
                return;
            }
            
            if (isValid) {
                // Get form data
                const formData = new FormData(this);
                const supportData = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    os: formData.get('os'),
                    issue: formData.get('issue'),
                    detail: formData.get('detail'),
                    time: Array.from(timeCheckboxes).map(cb => cb.value)
                };
                
                // Simulate form submission
                showNotification('원격 지원 예약이 신청되었습니다. 담당자가 연락드려 일정을 확정하겠습니다.');
                this.reset();
            } else {
                showNotification('필수 항목을 모두 입력해주세요.');
            }
        });
    }
}

// Contact method functions
function callCenter() {
    showNotification('고객센터 전화번호: 02-1234-5678');
    // In a real implementation, this might open a VoIP client or show instructions
}

function sendEmail() {
    const emailAddress = 'support@career.sw.or.kr';
    const subject = 'SW기술자 경력관리시스템 문의';
    const body = '문의 내용을 작성해주세요.';
    
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

function startChat() {
    // Create a simple chat widget
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-header">
            <h4>💬 실시간 채팅 상담</h4>
            <button class="chat-close" onclick="closeChat()">&times;</button>
        </div>
        <div class="chat-messages">
            <div class="chat-message system">
                <p>안녕하세요! SW기술자 경력관리시스템 고객센터입니다.</p>
                <p>무엇을 도와드릴까요?</p>
                <small>오늘 ${new Date().toLocaleTimeString()}</small>
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" class="chat-input" placeholder="메시지를 입력하세요..." onkeypress="handleChatInput(event)">
            <button class="chat-send" onclick="sendChatMessage()">전송</button>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
    
    // Add chat widget styles
    addChatStyles();
    
    // Focus on input
    chatWidget.querySelector('.chat-input').focus();
}

function closeChat() {
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.remove();
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `
        <p>${message}</p>
        <small>오늘 ${new Date().toLocaleTimeString()}</small>
    `;
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate system response
    setTimeout(() => {
        const systemMessage = document.createElement('div');
        systemMessage.className = 'chat-message system';
        systemMessage.innerHTML = `
            <p>문의해주신 내용을 확인했습니다. 잠시만 기다려주세요.</p>
            <small>오늘 ${new Date().toLocaleTimeString()}</small>
        `;
        chatMessages.appendChild(systemMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addChatStyles() {
    if (document.getElementById('chatStyles')) return;
    
    const styles = `
        <style id="chatStyles">
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                flex-direction: column;
            }
            
            .chat-header {
                background: #4a90e2;
                color: white;
                padding: 15px;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-header h4 {
                margin: 0;
                font-size: 16px;
            }
            
            .chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .chat-message {
                margin-bottom: 15px;
                padding: 10px;
                border-radius: 8px;
                max-width: 80%;
            }
            
            .chat-message.system {
                background: white;
                border: 1px solid #e9ecef;
                margin-right: auto;
            }
            
            .chat-message.user {
                background: #4a90e2;
                color: white;
                margin-left: auto;
            }
            
            .chat-message p {
                margin: 0 0 5px 0;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .chat-message small {
                font-size: 11px;
                opacity: 0.7;
            }
            
            .chat-input-area {
                display: flex;
                padding: 15px;
                border-top: 1px solid #e9ecef;
                background: white;
                border-radius: 0 0 10px 10px;
            }
            
            .chat-input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
            }
            
            .chat-send {
                margin-left: 10px;
                padding: 8px 15px;
                background: #4a90e2;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
            }
            
            .chat-send:hover {
                background: #357abd;
            }
            
            @media (max-width: 768px) {
                .chat-widget {
                    width: 300px;
                    height: 400px;
                    bottom: 10px;
                    right: 10px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Add CSS for help page specific elements
const helpPageStyles = `
    <style id="helpPageStyles">
        .faq-search {
            margin-bottom: 30px;
        }
        
        .search-box {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .faq-search-input {
            flex: 1;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        
        .faq-search-btn {
            padding: 12px 25px;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .faq-categories {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .faq-category-btn {
            padding: 8px 16px;
            border: 2px solid #4a90e2;
            background-color: transparent;
            color: #4a90e2;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .faq-category-btn:hover,
        .faq-category-btn.active {
            background-color: #4a90e2;
            color: white;
        }
        
        .faq-item {
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            overflow: hidden;
            background-color: white;
        }
        
        .faq-question {
            padding: 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            transition: background-color 0.3s ease;
        }
        
        .faq-question:hover {
            background-color: #e9ecef;
        }
        
        .faq-question h5 {
            margin: 0;
            font-size: 16px;
            color: #333;
            flex: 1;
        }
        
        .faq-toggle {
            color: #4a90e2;
            font-weight: bold;
            font-size: 18px;
            transition: transform 0.3s ease;
        }
        
        .faq-item.active .faq-toggle {
            transform: rotate(180deg);
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-answer > div {
            padding: 20px;
        }
        
        .faq-answer p {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .faq-answer ul, .faq-answer ol {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .faq-answer li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .fee-table {
            margin: 15px 0;
            overflow-x: auto;
        }
        
        .fee-table table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
        }
        
        .fee-table th,
        .fee-table td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        
        .fee-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        .faq-pagination {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        
        .showing-results {
            color: #666;
            font-size: 14px;
        }
        
        /* Guide styles */
        .guide-menu {
            display: flex;
            gap: 5px;
            margin-bottom: 30px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .guide-tab {
            padding: 12px 20px;
            border: none;
            background-color: transparent;
            color: #666;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }
        
        .guide-tab:hover,
        .guide-tab.active {
            color: #4a90e2;
            border-bottom-color: #4a90e2;
        }
        
        .guide-panel {
            display: none;
        }
        
        .guide-panel.active {
            display: block;
        }
        
        .guide-steps {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        
        .guide-step {
            display: flex;
            gap: 20px;
            padding: 25px;
            background-color: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #4a90e2;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            background-color: #4a90e2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        .step-content h5 {
            color: #4a90e2;
            margin-bottom: 10px;
        }
        
        .step-content p {
            margin-bottom: 15px;
            color: #666;
        }
        
        .step-content ul {
            list-style: none;
            margin-bottom: 15px;
        }
        
        .step-content li {
            padding: 4px 0;
            padding-left: 20px;
            position: relative;
            color: #555;
        }
        
        .step-content li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
        }
        
        .step-image {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            color: #666;
            font-style: italic;
        }
        
        .step-tip {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            font-size: 14px;
            margin-top: 15px;
        }
        
        /* Company search styles */
        .company-search-form {
            margin-bottom: 30px;
        }
        
        .search-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .company-search-input {
            flex: 1;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        
        .company-search-btn {
            padding: 12px 25px;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .search-filters {
            display: flex;
            gap: 15px;
        }
        
        .region-filter,
        .size-filter {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        
        .results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        .company-table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .company-table th,
        .company-table td {
            padding: 15px 12px;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
            font-size: 14px;
        }
        
        .company-table th {
            background-color: #4a90e2;
            color: white;
            font-weight: 600;
        }
        
        .company-table tr:hover {
            background-color: #f8f9fa;
        }
        
        .company-name {
            min-width: 200px;
        }
        
        .company-name strong {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }
        
        .company-desc {
            font-size: 12px;
            color: #666;
        }
        
        .size-badge,
        .status-badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }
        
        .size-badge.large {
            background-color: #dc3545;
            color: white;
        }
        
        .size-badge.medium {
            background-color: #ffc107;
            color: #333;
        }
        
        .size-badge.small {
            background-color: #28a745;
            color: white;
        }
        
        .size-badge.startup {
            background-color: #17a2b8;
            color: white;
        }
        
        .status-badge.active {
            background-color: #d4edda;
            color: #155724;
        }
        
        /* Contact styles */
        .contact-methods {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .contact-method {
            background-color: white;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .contact-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .contact-method h5 {
            color: #4a90e2;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .contact-info p {
            margin-bottom: 8px;
            color: #666;
            line-height: 1.5;
        }
        
        .contact-info strong {
            color: #333;
            font-size: 18px;
        }
        
        .contact-btn {
            padding: 10px 20px;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 15px;
            transition: background-color 0.3s ease;
        }
        
        .contact-btn:hover {
            background-color: #357abd;
        }
        
        .inquiry-form {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        
        .inquiry-form h4 {
            color: #4a90e2;
            margin-bottom: 25px;
            text-align: center;
        }
        
        /* Remote support styles */
        .support-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .support-notice h4 {
            color: #856404;
            margin-bottom: 15px;
        }
        
        .support-notice ul {
            list-style: none;
            margin: 0;
        }
        
        .support-notice li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
            color: #856404;
        }
        
        .support-notice li:before {
            content: '•';
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .process-flow {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        
        .process-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            min-width: 150px;
        }
        
        .process-icon {
            width: 40px;
            height: 40px;
            background-color: #4a90e2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .process-item h5 {
            color: #4a90e2;
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .process-item p {
            font-size: 12px;
            color: #666;
        }
        
        .process-arrow {
            font-size: 20px;
            color: #4a90e2;
        }
        
        .requirements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .req-item {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4a90e2;
        }
        
        .req-item h5 {
            color: #4a90e2;
            margin-bottom: 15px;
        }
        
        .req-item ul {
            list-style: none;
        }
        
        .req-item li {
            padding: 4px 0;
            padding-left: 20px;
            position: relative;
            font-size: 14px;
            color: #666;
        }
        
        .req-item li:before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #4a90e2;
        }
        
        .time-preferences {
            display: flex;
            gap: 20px;
            margin-top: 10px;
        }
        
        .time-option {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }
        
        .time-option input[type="checkbox"] {
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .contact-methods {
                grid-template-columns: 1fr;
            }
            
            .search-filters {
                flex-direction: column;
            }
            
            .results-header {
                flex-direction: column;
                gap: 10px;
            }
            
            .process-flow {
                flex-direction: column;
            }
            
            .process-arrow {
                transform: rotate(90deg);
            }
            
            .requirements-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', helpPageStyles);