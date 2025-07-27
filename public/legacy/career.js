// Career page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initSidebarNavigation();
    initCareerForm();
    initFileUpload();
    initTableActions();
    initCertificateForm();
    initHistoryFilter();
});

// Sidebar navigation
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const contentPanels = document.querySelectorAll('.content-panel');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and panels
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding panel
            const targetId = this.getAttribute('href').substring(1);
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Career form functionality
function initCareerForm() {
    const careerForm = document.querySelector('.career-form');
    if (!careerForm) return;
    
    careerForm.addEventListener('submit', function(e) {
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
            showNotification('경력 등록 신청이 완료되었습니다. 심사 후 결과를 안내드리겠습니다.');
            careerForm.reset();
        } else {
            showNotification('필수 항목을 모두 입력해주세요.');
        }
    });
    
    // Date validation
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            endDateInput.min = this.value;
        });
        
        endDateInput.addEventListener('change', function() {
            if (this.value && startDateInput.value && this.value < startDateInput.value) {
                this.value = '';
                showNotification('퇴사일은 입사일보다 늦어야 합니다.');
            }
        });
    }
    
    // Temporary save button
    const tempSaveBtn = document.querySelector('.btn-secondary');
    if (tempSaveBtn) {
        tempSaveBtn.addEventListener('click', function() {
            showNotification('임시저장되었습니다.');
        });
    }
}

// File upload functionality
function initFileUpload() {
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.getElementById('documents');
    
    if (!fileUpload || !fileInput) return;
    
    // Drag and drop functionality
    fileUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4a90e2';
        this.style.backgroundColor = '#f8f9fa';
    });
    
    fileUpload.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = 'transparent';
    });
    
    fileUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = 'transparent';
        
        const files = e.dataTransfer.files;
        handleFileSelection(files);
    });
    
    // File input change
    fileInput.addEventListener('change', function() {
        handleFileSelection(this.files);
    });
    
    function handleFileSelection(files) {
        const fileList = Array.from(files);
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        let validFiles = [];
        let invalidFiles = [];
        
        fileList.forEach(file => {
            if (!validTypes.includes(file.type)) {
                invalidFiles.push(file.name + ' (지원하지 않는 파일 형식)');
            } else if (file.size > maxSize) {
                invalidFiles.push(file.name + ' (파일 크기 초과)');
            } else {
                validFiles.push(file);
            }
        });
        
        if (invalidFiles.length > 0) {
            showNotification('다음 파일들을 업로드할 수 없습니다: ' + invalidFiles.join(', '));
        }
        
        if (validFiles.length > 0) {
            displaySelectedFiles(validFiles);
        }
    }
    
    function displaySelectedFiles(files) {
        const fileUploadText = document.querySelector('.file-upload-text');
        if (!fileUploadText) return;
        
        const fileListDiv = document.createElement('div');
        fileListDiv.className = 'selected-files';
        fileListDiv.innerHTML = '<h5>선택된 파일:</h5>';
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <small>(${formatFileSize(file.size)})</small>
            `;
            fileListDiv.appendChild(fileItem);
        });
        
        // Remove existing file list
        const existingList = document.querySelector('.selected-files');
        if (existingList) {
            existingList.remove();
        }
        
        fileUploadText.appendChild(fileListDiv);
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Table actions functionality
function initTableActions() {
    const editButtons = document.querySelectorAll('.career-table .btn-small:first-child');
    const deleteButtons = document.querySelectorAll('.career-table .btn-small:last-child');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const company = row.cells[1].textContent;
            showNotification(`${company} 경력 정보를 수정합니다.`);
            // Here you would typically open an edit modal or redirect to edit page
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const company = row.cells[1].textContent;
            
            if (confirm(`${company} 경력을 삭제하시겠습니까?`)) {
                row.remove();
                showNotification('경력이 삭제되었습니다.');
            }
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const tableRows = document.querySelectorAll('.career-table tbody tr');
        
        tableRows.forEach(row => {
            const company = row.cells[1].textContent.toLowerCase();
            const jobDescription = row.cells[4].textContent.toLowerCase();
            
            if (company.includes(searchTerm) || jobDescription.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        if (searchTerm) {
            showNotification(`"${searchInput.value}" 검색 결과를 표시합니다.`);
        } else {
            showNotification('전체 경력을 표시합니다.');
        }
    }
}

// Certificate form functionality
function initCertificateForm() {
    const certTypeRadios = document.querySelectorAll('input[name="cert-type"]');
    const previewBtn = document.querySelector('.btn-secondary');
    const issueBtn = document.querySelector('.btn-primary');
    
    certTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateCertificatePreview(this.value);
        });
    });
    
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            showCertificatePreview();
        });
    }
    
    if (issueBtn) {
        issueBtn.addEventListener('click', function() {
            const selectedType = document.querySelector('input[name="cert-type"]:checked');
            const purpose = document.querySelector('select[name="purpose"]').value;
            
            if (!selectedType) {
                showNotification('발급 유형을 선택해주세요.');
                return;
            }
            
            if (!purpose) {
                showNotification('발급 목적을 선택해주세요.');
                return;
            }
            
            showNotification('경력확인서 발급 신청이 완료되었습니다. 발급까지 1-2일 소요됩니다.');
        });
    }
    
    function updateCertificatePreview(type) {
        const previewContent = document.querySelector('.preview-content');
        if (!previewContent) return;
        
        if (type === 'total') {
            previewContent.innerHTML = `
                <p><strong>성명:</strong> 홍길동</p>
                <p><strong>생년월일:</strong> 1990.01.01</p>
                <p><strong>총 경력기간:</strong> 4년 10개월</p>
                <p><strong>경력 건수:</strong> 2건 (승인된 경력 기준)</p>
                <p><strong>포함 경력:</strong> 모든 승인된 경력</p>
            `;
        } else {
            previewContent.innerHTML = `
                <p><strong>성명:</strong> 홍길동</p>
                <p><strong>생년월일:</strong> 1990.01.01</p>
                <p><strong>선택 경력기간:</strong> 선택한 경력에 따라 계산</p>
                <p><strong>경력 건수:</strong> 선택한 경력 건수</p>
                <p><strong>포함 경력:</strong> 사용자가 선택한 경력만</p>
            `;
        }
    }
    
    function showCertificatePreview() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content certificate-preview-modal">
                <div class="modal-header">
                    <h3>경력확인서 미리보기</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="certificate-document">
                        <div class="cert-header">
                            <h2>SW기술자 경력확인서</h2>
                            <p>발급번호: 2024-0120-001</p>
                        </div>
                        <div class="cert-content">
                            <table class="cert-table">
                                <tr>
                                    <th>성명</th>
                                    <td>홍길동</td>
                                    <th>생년월일</th>
                                    <td>1990.01.01</td>
                                </tr>
                                <tr>
                                    <th>총 경력기간</th>
                                    <td colspan="3">4년 10개월</td>
                                </tr>
                            </table>
                            <div class="cert-careers">
                                <h4>경력 상세</h4>
                                <table class="career-detail-table">
                                    <thead>
                                        <tr>
                                            <th>회사명</th>
                                            <th>근무기간</th>
                                            <th>직급/직책</th>
                                            <th>업무내용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>(주)소프트웨어솔루션</td>
                                            <td>2021.01 ~ 2023.02</td>
                                            <td>주임연구원</td>
                                            <td>시스템 분석 및 설계</td>
                                        </tr>
                                        <tr>
                                            <td>(주)정보시스템</td>
                                            <td>2019.03 ~ 2020.12</td>
                                            <td>연구원</td>
                                            <td>소프트웨어 개발</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="cert-footer">
                            <p>발급일: 2024년 01월 20일</p>
                            <p>SW기술자 경력관리시스템</p>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary print-btn">인쇄</button>
                    <button class="btn-primary download-btn">PDF 다운로드</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add certificate preview styles
        addCertificatePreviewStyles();
        
        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const printBtn = modal.querySelector('.print-btn');
        const downloadBtn = modal.querySelector('.download-btn');
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        downloadBtn.addEventListener('click', () => {
            showNotification('PDF 다운로드 기능은 실제 시스템에서 구현됩니다.');
        });
    }
}

// History filter functionality
function initHistoryFilter() {
    const filterType = document.querySelector('select[name="filter-type"]');
    const startDate = document.querySelector('input[name="start-date"]');
    const endDate = document.querySelector('input[name="end-date"]');
    const filterBtn = document.querySelector('.history-filter .search-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const type = filterType ? filterType.value : 'all';
            const start = startDate ? startDate.value : '';
            const end = endDate ? endDate.value : '';
            
            filterHistoryItems(type, start, end);
        });
    }
    
    function filterHistoryItems(type, startDate, endDate) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        let visibleCount = 0;
        
        timelineItems.forEach(item => {
            let showItem = true;
            
            // Filter by type
            if (type !== 'all') {
                const content = item.querySelector('.timeline-content h5').textContent;
                let itemType = '';
                
                if (content.includes('경력 등록')) itemType = 'register';
                else if (content.includes('정보 수정')) itemType = 'modify';
                else if (content.includes('확인서 발급')) itemType = 'certificate';
                
                if (itemType !== type) {
                    showItem = false;
                }
            }
            
            // Filter by date range
            if (showItem && (startDate || endDate)) {
                const itemDate = item.querySelector('.timeline-date').textContent.replace(/\./g, '-');
                const itemDateObj = new Date(itemDate);
                
                if (startDate && itemDateObj < new Date(startDate)) {
                    showItem = false;
                }
                
                if (endDate && itemDateObj > new Date(endDate)) {
                    showItem = false;
                }
            }
            
            item.style.display = showItem ? '' : 'none';
            if (showItem) visibleCount++;
        });
        
        showNotification(`${visibleCount}개의 이력이 조회되었습니다.`);
    }
}

// Add certificate preview styles
function addCertificatePreviewStyles() {
    if (document.getElementById('certificatePreviewStyles')) return;
    
    const styles = `
        <style id="certificatePreviewStyles">
            .certificate-preview-modal {
                max-width: 800px;
                width: 90%;
            }
            
            .certificate-document {
                background: white;
                padding: 40px;
                border: 1px solid #ddd;
                font-family: 'Malgun Gothic', sans-serif;
            }
            
            .cert-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #4a90e2;
            }
            
            .cert-header h2 {
                font-size: 24px;
                color: #4a90e2;
                margin-bottom: 10px;
            }
            
            .cert-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
            }
            
            .cert-table th,
            .cert-table td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
            
            .cert-table th {
                background-color: #f8f9fa;
                font-weight: 600;
                width: 120px;
            }
            
            .cert-careers h4 {
                margin-bottom: 15px;
                color: #333;
            }
            
            .career-detail-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
            }
            
            .career-detail-table th,
            .career-detail-table td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: center;
                font-size: 14px;
            }
            
            .career-detail-table th {
                background-color: #f8f9fa;
                font-weight: 600;
            }
            
            .cert-footer {
                text-align: right;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
            }
            
            .modal-actions {
                padding: 20px;
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                border-top: 1px solid #eee;
            }
            
            .selected-files {
                margin-top: 15px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 5px;
            }
            
            .selected-files h5 {
                margin-bottom: 10px;
                color: #4a90e2;
                font-size: 14px;
            }
            
            .file-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #e9ecef;
            }
            
            .file-item:last-child {
                border-bottom: none;
            }
            
            .file-item span {
                font-size: 14px;
                color: #333;
            }
            
            .file-item small {
                color: #666;
                font-size: 12px;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Notification function (reusing from main script)
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4a90e2;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}