class BlogManager {
    constructor() {
        this.posts = [];
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

            console.log('Bắt đầu hiển thị bài viết mới...');
            this.loadPosts();
            
        } catch (error) {
            console.error('Lỗi chi tiết khi khởi tạo blog:', {
                message: error.message,
                stack: error.stack
            });
        }
    }

    loadPosts() {
        const isIndexPage = window.location.pathname === '/index.html';  // Kiểm tra trang hiện tại

        // Nếu là trang index.html, chỉ lấy 3 bài mới nhất
        const postsToLoad = isIndexPage ? this.posts.slice(0, 3) : this.posts;

        console.log('Đang tìm container .latest-posts .posts-grid...');
        const container = document.querySelector('.latest-posts .posts-grid');
        
        if (!container) {
            console.error("Lỗi: Không tìm thấy .posts-grid trong .latest-posts");
            return;
        }

        console.log('Đã tìm thấy container, xóa nội dung cũ...');
        container.innerHTML = '';

        console.log('Bắt đầu tạo các phần tử bài viết...');
        postsToLoad.forEach((post, index) => {
            console.log(`Đang tạo bài viết thứ ${index + 1}:`, post);
            
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            postElement.innerHTML = `
                <img src="path/to/image.jpg" alt="Post Image">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.file}">Read More</a>
            `;

            container.appendChild(postElement);
            console.log(`Đã thêm bài viết ${index + 1} vào container`);
        });
        
        console.log('Hoàn thành việc tải các bài viết');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM đã sẵn sàng, khởi tạo BlogManager...');
    const blogManager = new BlogManager();
    blogManager.initialize();
});
