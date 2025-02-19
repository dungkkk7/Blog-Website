class BlogManager {
    constructor() {
        this.posts = [];
    }

    async initialize() {
        try {
            // Tải dữ liệu từ file posts.json
            const response = await fetch('post.json');
            if (!response.ok) {
                throw new Error('Không thể tải tệp JSON');
            }
            const data = await response.json();
            this.posts = data.posts; // Lưu thông tin các bài viết vào this.posts

            this.loadLatestPosts(); // Gọi hàm để hiển thị các bài viết mới
        } catch (error) {
            console.error('Lỗi khi khởi tạo blog:', error);
        }
    }

    // Hàm để tạo và hiển thị các bài viết trong phần Latest Posts
    loadLatestPosts() {
        const container = document.querySelector('.latest-posts .posts-grid'); // Lấy phần tử chứa bài viết
        if (!container) {
            console.error("Lỗi: Không tìm thấy .posts-grid trong .latest-posts.");
            return;
        }
        container.innerHTML = ''; // Xóa các bài viết mẫu

        // Duyệt qua các bài viết và tạo phần tử HTML cho từng bài
        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post'; // Thêm class cho mỗi bài viết
            
            postElement.innerHTML = `
                <img src="path/to/image.jpg" alt="Post Image"> <!-- Bạn có thể thay đổi ảnh tùy thích -->
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.file}">Read More</a>
            `;

            container.appendChild(postElement); // Thêm bài viết vào container
        });
    }
}

// Khởi tạo blog manager khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    blogManager.initialize();
});