// News page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initNoticeSearch();
    initDownloadFilters();
    initNewsletterSubscription();
    initEventFilters();
    initPagination();
});

// Notice search functionality
function initNoticeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const searchType = document.querySelector('.search-type');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performNoticeSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performNoticeSearch();
            }
        });
    }
    
    function performNoticeSearch() {
        const keyword = searchInput.value.trim();
        const type = searchType.value;
        
        if (!keyword) {
            showNotification('검색어를 입력해주세요.');
            return;
        }
        
        // Here you would typically make an API call to search notices
        showNotification(`"${keyword}"에 대한 ${getSearchTypeText(type)} 검색을 수행합니다.`);
        
        // Simulate search results
        filterNotices(keyword, type);
    }
    
    function getSearchTypeText(type) {
        const types = {
            'all': '전체',
            'title': '제목',
            'content': '내용',
            'title+content': '제목+내용'
        };
        return types[type] || '전체';
    }
    
    function filterNotices(keyword, type) {
        const noticeRows = document.querySelectorAll('.notice-table tbody tr');
        let visibleCount = 0;
        
        noticeRows.forEach(row => {
            const title = row.querySelector('.notice-title a').textContent.toLowerCase();
            const category = row.cells[1].textContent.toLowerCase();
            const searchKeyword = keyword.toLowerCase();
            
            let shouldShow = false;
            
            switch(type) {
                case 'title':
                    shouldShow = title.includes(searchKeyword);
                    break;
                case 'content':
                    // In a real implementation, you would search in content
                    shouldShow = category.includes(searchKeyword);
                    break;
                case 'title+content':
                    shouldShow = title.includes(searchKeyword) || category.includes(searchKeyword);
                    break;
                default:
                    shouldShow = title.includes(searchKeyword) || category.includes(searchKeyword);
            }
            
            row.style.display = shouldShow ? '' : 'none';
            if (shouldShow) visibleCount++;
        });
        
        // Update count display
        const countDisplay = document.querySelector('.view-options span');
        if (countDisplay) {
            countDisplay.innerHTML = `총 <strong>${visibleCount}</strong>건`;
        }
    }
}

// Download filters functionality
function initDownloadFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const downloadItems = document.querySelectorAll('.download-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterDownloads(category);
        });
    });
    
    function filterDownloads(category) {
        downloadItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
                item.style.animation = 'fadeIn 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Newsletter subscription functionality
function initNewsletterSubscription() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('이메일 주소를 입력해주세요.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // Simulate subscription
            showNotification('뉴스레터 구독이 완료되었습니다. 확인 이메일을 발송했습니다.');
            emailInput.value = '';
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Event filters functionality
function initEventFilters() {
    const eventFilterBtns = document.querySelectorAll('[data-event]');
    const eventItems = document.querySelectorAll('.event-item');
    
    eventFilterBtns.forEach(btn => {
        if (btn.classList.contains('filter-btn')) {
            btn.addEventListener('click', function() {
                // Remove active class from all filter buttons
                eventFilterBtns.forEach(b => {
                    if (b.classList.contains('filter-btn')) {
                        b.classList.remove('active');
                    }
                });
                // Add active class to clicked button
                this.classList.add('active');
                
                const eventType = this.getAttribute('data-event');
                filterEvents(eventType);
            });
        }
    });
    
    function filterEvents(eventType) {
        eventItems.forEach(item => {
            if (eventType === 'all' || item.getAttribute('data-event') === eventType) {
                item.style.display = 'flex';
                item.style.animation = 'slideIn 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Pagination functionality
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        if (!btn.disabled && !btn.classList.contains('active')) {
            btn.addEventListener('click', function() {
                const pageNum = this.textContent;
                
                if (pageNum === '›' || pageNum === '››' || pageNum === '‹' || pageNum === '‹‹') {
                    // Handle navigation buttons
                    handleNavigation(pageNum);
                } else {
                    // Handle page number buttons
                    changePage(parseInt(pageNum));
                }
            });
        }
    });
    
    function handleNavigation(navType) {
        const currentPage = document.querySelector('.page-btn.active');
        const currentPageNum = parseInt(currentPage.textContent);
        
        switch(navType) {
            case '›':
                changePage(currentPageNum + 1);
                break;
            case '››':
                changePage(5); // Go to last page (assuming 5 pages)
                break;
            case '‹':
                changePage(currentPageNum - 1);
                break;
            case '‹‹':
                changePage(1);
                break;
        }
    }
    
    function changePage(pageNum) {
        // Remove active class from all page buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected page
        const targetPage = Array.from(pageButtons).find(btn => btn.textContent == pageNum);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Here you would typically load new data for the page
        showNotification(`${pageNum}페이지로 이동합니다.`);
        
        // Scroll to top of content
        document.querySelector('.notice-list').scrollIntoView({ behavior: 'smooth' });
    }
}

// Notice detail functionality
function showNoticeDetail(noticeId) {
    // Create modal for notice detail
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content notice-detail-modal">
            <div class="modal-header">
                <h3>공지사항 상세</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="notice-detail">
                    <div class="notice-header">
                        <h4>${getNoticeTitle(noticeId)}</h4>
                        <div class="notice-meta">
                            <span>작성자: 관리자</span>
                            <span>등록일: ${getNoticeDate(noticeId)}</span>
                            <span>조회수: ${getNoticeViews(noticeId)}</span>
                        </div>
                    </div>
                    <div class="notice-content">
                        ${getNoticeContent(noticeId)}
                    </div>
                    <div class="notice-attachments">
                        <h5>첨부파일</h5>
                        <div class="attachment-list">
                            <a href="#" class="attachment-item">
                                <span class="attachment-icon">📎</span>
                                <span class="attachment-name">시스템_점검_안내.pdf</span>
                                <span class="attachment-size">(245KB)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="printNotice()">인쇄</button>
                <button class="btn-primary" onclick="closeModal()">확인</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Add modal styles if not exists
    addNoticeDetailStyles();
}

function getNoticeTitle(noticeId) {
    const titles = {
        1: '[긴급] 2024년 1월 시스템 점검 안내',
        2: 'SW기술자 경력등록 신청 서류 양식 업데이트',
        3: '2024년 수수료 정책 변경 안내',
        4: '모바일 앱 서비스 오픈 안내',
        5: '기업회원 대량 신청 서비스 개선 안내'
    };
    return titles[noticeId] || '공지사항 제목';
}

function getNoticeDate(noticeId) {
    const dates = {
        1: '2024.01.20',
        2: '2024.01.18',
        3: '2024.01.15',
        4: '2024.01.12',
        5: '2024.01.10'
    };
    return dates[noticeId] || '2024.01.01';
}

function getNoticeViews(noticeId) {
    const views = {
        1: '1,245',
        2: '856',
        3: '1,123',
        4: '2,456',
        5: '645'
    };
    return views[noticeId] || '100';
}

function getNoticeContent(noticeId) {
    const contents = {
        1: `
            <p><strong>시스템 점검 일정:</strong> 2024년 1월 21일(일) 02:00 ~ 06:00 (4시간)</p>
            <p><strong>점검 사유:</strong> 서버 하드웨어 교체 및 시스템 성능 개선</p>
            <p><strong>점검 내용:</strong></p>
            <ul>
                <li>메인 서버 하드웨어 교체</li>
                <li>데이터베이스 최적화</li>
                <li>보안 패치 적용</li>
                <li>백업 시스템 점검</li>
            </ul>
            <p><strong>주의사항:</strong> 점검 시간 중에는 모든 서비스 이용이 불가능합니다.</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        `,
        2: `
            <p>SW기술자 경력등록 신청 시 사용하는 서류 양식이 업데이트되었습니다.</p>
            <p><strong>변경 내용:</strong></p>
            <ul>
                <li>업무기술서 양식 개선</li>
                <li>경력증명서 필수 기재사항 추가</li>
                <li>프로젝트 수행확인서 신규 양식</li>
            </ul>
            <p><strong>적용일:</strong> 2024년 2월 1일부터</p>
            <p>새로운 양식은 자료실에서 다운로드하실 수 있습니다.</p>
        `
    };
    return contents[noticeId] || '<p>공지사항 내용을 불러오는 중입니다.</p>';
}

// Download functionality
function downloadFile(filename) {
    showNotification(`${filename} 파일을 다운로드합니다.`);
    // In a real implementation, this would trigger an actual file download
}

// Newsletter functionality
function viewNewsletter(volume) {
    showNotification(`Vol.${volume} 뉴스레터를 온라인으로 보기합니다.`);
    // In a real implementation, this would open the newsletter in a new window/tab
}

function downloadNewsletter(volume) {
    showNotification(`Vol.${volume} 뉴스레터 PDF를 다운로드합니다.`);
    // In a real implementation, this would trigger PDF download
}

// Event functionality
function participateEvent(eventId) {
    showNotification('이벤트 참여 페이지로 이동합니다.');
    // In a real implementation, this would redirect to event participation page
}

function registerEvent(eventId) {
    showNotification('행사 등록 페이지로 이동합니다.');
    // In a real implementation, this would redirect to event registration page
}

// Utility functions
function addNoticeDetailStyles() {
    if (document.getElementById('noticeDetailStyles')) return;
    
    const styles = `
        <style id="noticeDetailStyles">
            .notice-detail-modal {
                max-width: 800px;
                width: 90%;
            }
            
            .notice-detail {
                padding: 20px 0;
            }
            
            .notice-header {
                border-bottom: 1px solid #e9ecef;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            
            .notice-header h4 {
                font-size: 20px;
                color: #333;
                margin-bottom: 15px;
                line-height: 1.4;
            }
            
            .notice-meta {
                display: flex;
                gap: 20px;
                font-size: 14px;
                color: #666;
            }
            
            .notice-content {
                line-height: 1.8;
                margin-bottom: 30px;
            }
            
            .notice-content p {
                margin-bottom: 15px;
            }
            
            .notice-content ul {
                margin: 15px 0;
                padding-left: 20px;
            }
            
            .notice-content li {
                margin-bottom: 8px;
            }
            
            .notice-attachments h5 {
                color: #4a90e2;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .attachment-list {
                border: 1px solid #e9ecef;
                border-radius: 5px;
                padding: 15px;
            }
            
            .attachment-item {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: #333;
                padding: 8px 0;
                transition: color 0.3s ease;
            }
            
            .attachment-item:hover {
                color: #4a90e2;
            }
            
            .attachment-icon {
                font-size: 16px;
            }
            
            .attachment-size {
                color: #999;
                font-size: 12px;
            }
            
            .modal-actions {
                padding: 20px;
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                border-top: 1px solid #eee;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function printNotice() {
    window.print();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Load more newsletters
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('load-more-btn')) {
        showNotification('추가 뉴스레터를 불러옵니다.');
        // In a real implementation, this would load more newsletter items
    }
});

// Items per page change
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('items-per-page')) {
        const itemsCount = e.target.value;
        showNotification(`페이지당 ${itemsCount}개씩 표시합니다.`);
        // In a real implementation, this would reload the table with new pagination
    }
});

// Add fadeIn animation styles
const animationStyles = `
    <style id="animationStyles">
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);