// posts/web-development-basics.md
---
title: Hướng Dẫn Cơ Bản Về Phát Triển Web
date: 2025-02-19
author: Bùi Việt Dũng
tags: [web development, frontend, html, css]
description: Tìm hiểu các khái niệm cơ bản về phát triển web và cách bắt đầu
---

# Hướng Dẫn Cơ Bản Về Phát Triển Web

Phát triển web là một lĩnh vực rộng lớn và đang phát triển nhanh chóng. Trong bài viết này, chúng ta sẽ tìm hiểu những kiến thức cơ bản nhất để bắt đầu.

## 1. HTML - Nền Tảng Của Web

HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để tạo và cấu trúc nội dung cho trang web. Dưới đây là một ví dụ đơn giản:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Trang Web Đầu Tiên</title>
</head>
<body>
    <h1>Xin chào thế giới!</h1>
</body>
</html>
```

## 2. CSS - Tạo Style Cho Trang Web

CSS (Cascading Style Sheets) giúp định dạng và tạo style cho nội dung HTML. Ví dụ:

```css
body {
    font-family: Arial, sans-serif;
    color: #333;
}

h1 {
    color: blue;
}
```

## 3. JavaScript - Thêm Tương Tác

JavaScript là ngôn ngữ lập trình giúp tạo tương tác cho trang web. Ví dụ đơn giản:

```javascript
document.querySelector('h1').addEventListener('click', function() {
    alert('Xin chào!');
});
```

Để bắt đầu học phát triển web, bạn nên:
1. Nắm vững HTML và CSS cơ bản
2. Học JavaScript căn bản
3. Thực hành với các dự án nhỏ
4. Tìm hiểu về responsive design
5. Học cách sử dụng các công cụ phát triển

// posts/javascript-tips.md
---
title: Những Mẹo Hay Khi Lập Trình JavaScript
date: 2025-02-18
author: Bùi Việt Dũng
tags: [javascript, programming, tips]
description: Khám phá các mẹo và kỹ thuật hữu ích khi lập trình JavaScript
---

# Những Mẹo Hay Khi Lập Trình JavaScript

JavaScript là một ngôn ngữ mạnh mẽ nhưng đôi khi có thể gây nhầm lẫn. Dưới đây là một số mẹo hữu ích để code tốt hơn.

## 1. Sử Dụng Destructuring

Destructuring giúp code ngắn gọn và dễ đọc hơn:

```javascript
// Thay vì
const first = array[0];
const second = array[1];

// Hãy dùng
const [first, second] = array;

// Với objects
const { name, age } = person;
```

## 2. Template Literals

Template literals giúp viết chuỗi dễ dàng hơn:

```javascript
const name = 'John';
const greeting = `Xin chào ${name}!`;
```

## 3. Arrow Functions

Arrow functions giúp code ngắn gọn và rõ ràng:

```javascript
// Thay vì
function add(a, b) {
    return a + b;
}

// Hãy dùng
const add = (a, b) => a + b;
```

Nhớ rằng:
- Luôn kiểm tra dữ liệu đầu vào
- Sử dụng ES6+ features khi có thể
- Tối ưu hiệu năng khi cần thiết
- Viết code dễ đọc và bảo trì

// posts/react-components.md
---
title: Hướng Dẫn Tạo Components Trong React
date: 2025-02-17
author: Bùi Việt Dũng
tags: [react, javascript, frontend]
description: Học cách tạo và quản lý components trong React một cách hiệu quả
---

# Hướng Dẫn Tạo Components Trong React

React components là những khối xây dựng cơ bản của ứng dụng React. Hãy tìm hiểu cách tạo và sử dụng chúng hiệu quả.

## 1. Function Components

Function components là cách hiện đại nhất để tạo components trong React:

```jsx
function Welcome(props) {
    return <h1>Xin chào, {props.name}</h1>;
}

// Sử dụng
<Welcome name="Dũng" />
```

## 2. Hooks Trong Components

Hooks giúp quản lý state và side effects:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Đã đếm ${count} lần`;
    }, [count]);

    return (
        <button onClick={() => setCount(count + 1)}>
            Đã click {count} lần
        </button>
    );
}
```

## 3. Custom Hooks

Tạo custom hooks để tái sử dụng logic:

```jsx
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}
```

Những điểm quan trọng cần nhớ:
1. Luôn chia nhỏ components hợp lý
2. Sử dụng PropTypes để kiểm tra props
3. Tránh side effects không cần thiết
4. Tối ưu hiệu năng với useMemo và useCallback