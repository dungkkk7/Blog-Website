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
            this.loadLatestPosts();
            
        } catch (error) {
            console.error('Lỗi chi tiết khi khởi tạo blog:', {
                message: error.message,
                stack: error.stack
            });
        }
    }

    loadLatestPosts() {
        console.log('Đang tìm container #posts-container...');
        const container = document.querySelector('#posts-container');
        
        if (!container) {
            console.error("Lỗi: Không tìm thấy #posts-container");
            return;
        }
        
        console.log('Đã tìm thấy container, xóa nội dung cũ...');
        container.innerHTML = '';

        console.log('Bắt đầu tạo các phần tử bài viết...');
        this.posts.forEach((post, index) => {
            console.log(`Đang tạo bài viết thứ ${index + 1}:`, post);
            
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            postElement.innerHTML = `
                <img src="${post.image}" alt="Post Image">
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