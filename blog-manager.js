class BlogManager {
    constructor() {
        this.posts = [];
        this.currentPage = 1;
        this.postsPerPage = 6; // Số bài viết trên mỗi trang
        console.log('BlogManager được khởi tạo');
    }

    async initialize() {
        console.log('Bắt đầu khởi tạo...');
        try {
            console.log('Đang tải dữ liệu từ post.json...');
            const response = await fetch('post.json');
            console.log('Trạng thái response:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Không thể tải tệp JSON. Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Dữ liệu JSON đã tải:', data);
            
            if (!data.posts) {
                console.error('Lỗi: Không tìm thấy thuộc tính "posts" trong dữ liệu JSON');
                return;
            }
            
            this.posts = data.posts;
            console.log(`Đã tải ${this.posts.length} bài viết`);

            // Hiển thị số lượng bài post
            this.updatePostCount();

            console.log('Bắt đầu hiển thị bài viết mới...');
            this.loadPosts();
            
            // Khởi tạo phân trang nếu đang ở trang blog
            if (window.location.pathname.includes('blog.html')) {
                this.initializePagination();
            }
            
        } catch (error) {
            console.error('Lỗi chi tiết khi khởi tạo blog:', {
                message: error.message,
                stack: error.stack
            });
        }
    }

    // Thêm phương thức mới để hiển thị số lượng bài post
    updatePostCount() {
        const postCountElement = document.querySelector('.post-count');
        if (postCountElement) {
            postCountElement.textContent = `${this.posts.length} bài viết`;
        }
    }

    loadPosts() {
        const isIndexPage = window.location.pathname === '/index.html' || window.location.pathname === '/';  // Kiểm tra trang hiện tại

        // Nếu là trang index.html, chỉ lấy 3 bài mới nhất
        let postsToLoad;
        if (isIndexPage) {
            postsToLoad = this.posts.slice(0, 3);
        } else {
            // Tính toán bài viết cho trang hiện tại
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            postsToLoad = this.posts.slice(startIndex, startIndex + this.postsPerPage);
        }

        // Tìm container phù hợp
        const container = document.querySelector('.posts-grid');
        
        if (!container) {
            console.error("Lỗi: Không tìm thấy container cho bài viết");
            return;
        }

        console.log('Đã tìm thấy container, xóa nội dung cũ...');
        container.innerHTML = '';

        console.log('Bắt đầu tạo các phần tử bài viết...');
        postsToLoad.forEach((post, index) => {
            console.log(`Đang tạo bài viết thứ ${index + 1}:`, post);
            
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            // Tạo HTML cho bài post
            const postHTML = `
                <div class="post-icon">
                    <img src="crystal.png" class="post-dragon-icon" alt="Crystal">
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p class="post-meta">
                        <span class="post-date">${post.date}</span>
                    </p>
                    <p class="post-description">${post.description}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${post.file}" class="read-more">Read More</a>
                </div>
            `;
            
            postElement.innerHTML = postHTML;
            container.appendChild(postElement);
            console.log(`Đã thêm bài viết ${index + 1} vào container`);
        });
        
        console.log('Hoàn thành việc tải các bài viết');
    }

    // Thêm phương thức mới để khởi tạo phân trang
    initializePagination() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        if (!paginationContainer) {
            console.error("Không tìm thấy container phân trang");
            return;
        }

        // Cập nhật nút Previous
        const prevButton = paginationContainer.querySelector('a:first-child');
        prevButton.onclick = (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadPosts();
                this.updatePagination();
            }
        };

        // Cập nhật nút Next
        const nextButton = paginationContainer.querySelector('a:last-child');
        nextButton.onclick = (e) => {
            e.preventDefault();
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.loadPosts();
                this.updatePagination();
            }
        };

        // Tạo các số trang
        const pageNumbers = paginationContainer.querySelector('.page-numbers');
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === this.currentPage) {
                pageLink.classList.add('active');
            }
            
            pageLink.onclick = (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.loadPosts();
                this.updatePagination();
            };
            
            pageNumbers.appendChild(pageLink);
        }

        this.updatePagination();
    }

    // Thêm phương thức mới để cập nhật trạng thái phân trang
    updatePagination() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        if (!paginationContainer) return;

        // Cập nhật trạng thái nút Previous
        const prevButton = paginationContainer.querySelector('a:first-child');
        prevButton.style.opacity = this.currentPage === 1 ? '0.5' : '1';
        prevButton.style.pointerEvents = this.currentPage === 1 ? 'none' : 'auto';

        // Cập nhật trạng thái nút Next
        const nextButton = paginationContainer.querySelector('a:last-child');
        nextButton.style.opacity = this.currentPage === totalPages ? '0.5' : '1';
        nextButton.style.pointerEvents = this.currentPage === totalPages ? 'none' : 'auto';

        // Cập nhật trạng thái các số trang
        const pageLinks = paginationContainer.querySelectorAll('.page-numbers a');
        pageLinks.forEach((link, index) => {
            if (index + 1 === this.currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    loadLatestPosts() {
        console.log('Đang tìm container .posts-grid...');
        const container = document.querySelector('.posts-grid');
        
        if (!container) {
            console.error("Lỗi: Không tìm thấy .posts-grid");
            return;
        }
        
        console.log('Đã tìm thấy container, xóa nội dung cũ...');
        container.innerHTML = '';

        console.log('Bắt đầu tạo các phần tử bài viết...');
        this.posts.forEach((post, index) => {
            if (index == 3) {
                return;
            } // Chỉ tạo 3 bài viết đầu tiên
            console.log(`Đang tạo bài viết thứ ${index + 1}:`, post);
            
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.file}">Read More</a>
            `;

            container.appendChild(postElement);
            console.log(`Đã thêm bài viết ${index + 1} vào container`);
        });
        
        console.log('Hoàn thành việc tải các bài viết mới');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM đã sẵn sàng, khởi tạo BlogManager...');
    const blogManager = new BlogManager();
    blogManager.initialize();
});
