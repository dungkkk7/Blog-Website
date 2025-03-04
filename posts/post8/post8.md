Dưới đây là lời giải thích về thuật toán mã hóa RC4 theo cách của tôi, được trình bày một cách dễ hiểu với một ví dụ rõ ràng để bạn có thể theo dõi từng bước.

---

## Thuật toán RC4 là gì?

RC4 là một thuật toán mã hóa **đối xứng** (symmetric encryption), nghĩa là nó sử dụng cùng một khóa bí mật để cả mã hóa và giải mã dữ liệu. Đây là một thuật toán mã hóa **dòng** (stream cipher), tức là nó xử lý dữ liệu từng byte một, thay vì mã hóa theo khối như nhiều thuật toán khác (ví dụ: AES). RC4 được biết đến với sự đơn giản và tốc độ nhanh, nhưng nó cũng có một số lỗ hổng bảo mật nếu không được sử dụng đúng cách.

RC4 hoạt động qua hai giai đoạn chính:
1. **Thuật toán sắp xếp khóa (Key-Scheduling Algorithm - KSA)**: Tạo một mảng trạng thái ban đầu dựa trên khóa bí mật.
2. **Thuật toán sinh số giả ngẫu nhiên (Pseudo-Random Generation Algorithm - PRGA)**: Sinh ra một chuỗi byte giả ngẫu nhiên từ mảng trạng thái để mã hóa dữ liệu.

Hãy cùng tìm hiểu từng bước một cách chi tiết với một ví dụ cụ thể.

---

## Bước 1: Thuật toán sắp xếp khóa (KSA)

Mục tiêu của KSA là tạo ra một mảng trạng thái (gọi là `S`) gồm 256 byte, được xáo trộn dựa trên khóa bí mật. Mảng này sẽ được sử dụng trong bước tiếp theo để sinh chuỗi byte giả ngẫu nhiên.

### Các bước thực hiện KSA:
1. **Khởi tạo mảng `S`**: Điền mảng `S` với các giá trị từ 0 đến 255.
   - Ví dụ: `S = [0, 1, 2, 3, ..., 255]`

2. **Chuẩn bị mảng khóa**: Lấy khóa bí mật và lặp lại nó để tạo một mảng có độ dài 256 byte.
   - Ví dụ: Nếu khóa là "KEY" (3 byte: K=75, E=69, Y=89), mảng khóa sẽ là: `[75, 69, 89, 75, 69, 89, ...]` cho đến khi đủ 256 byte.

3. **Xáo trộn mảng `S`**:
   - Khởi tạo biến `j = 0`.
   - Với mỗi chỉ số `i` từ 0 đến 255:
     - Cập nhật `j = (j + S[i] + mảng_khóa[i]) mod 256`.
     - Hoán đổi giá trị tại `S[i]` và `S[j]`.

### Ví dụ minh họa KSA
Giả sử khóa là "KEY" (K=75, E=69, Y=89). Để đơn giản, ta chỉ làm vài bước đầu tiên:

- **Khởi tạo**:
  - `S = [0, 1, 2, 3, 4, ... , 255]`
  - Mảng khóa: `[75, 69, 89, 75, 69, 89, ...]`

- **Xáo trộn**:
  - `i = 0`, `j = 0`:
    - `j = (0 + S[0] + mảng_khóa[0]) mod 256 = (0 + 0 + 75) mod 256 = 75`
    - Hoán đổi `S[0]=0` và `S[75]=75` → `S = [75, 1, 2, 3, 4, ..., 0, ..., 255]`
  - `i = 1`, `j = 75`:
    - `j = (75 + S[1] + mảng_khóa[1]) mod 256 = (75 + 1 + 69) mod 256 = 145`
    - Hoán đổi `S[1]=1` và `S[145]=145` → `S = [75, 145, 2, 3, 4, ..., 0, ..., 1, ..., 255]`
  - `i = 2`, `j = 145`:
    - `j = (145 + S[2] + mảng_khóa[2]) mod 256 = (145 + 2 + 89) mod 256 = 236`
    - Hoán đổi `S[2]=2` và `S[236]=236` → `S = [75, 145, 236, 3, 4, ..., 0, ..., 1, ..., 2, ..., 255]`

Quá trình này tiếp tục cho đến `i = 255`. Sau KSA, mảng `S` đã được xáo trộn hoàn toàn dựa trên khóa "KEY".

---

## Bước 2: Thuật toán sinh số giả ngẫu nhiên (PRGA)

Sau khi có mảng `S` từ KSA, PRGA sử dụng nó để sinh ra một chuỗi byte giả ngẫu nhiên (keystream). Chuỗi này sau đó được **XOR** với dữ liệu gốc để mã hóa.

### Các bước thực hiện PRGA:
1. **Khởi tạo biến**:
   - `i = 0`, `j = 0`
2. **Với mỗi byte dữ liệu cần mã hóa**:
   - Tăng `i`: `i = (i + 1) mod 256`
   - Cập nhật `j`: `j = (j + S[i]) mod 256`
   - Hoán đổi `S[i]` và `S[j]`
   - Tính chỉ số `k`: `k = (S[i] + S[j]) mod 256`
   - Byte giả ngẫu nhiên là `S[k]`
   - Mã hóa: `byte_mã_hóa = byte_dữ_liệu XOR S[k]`

---

## Ví dụ minh họa mã hóa với RC4

Giả sử:
- **Khóa**: "KEY" (đã tạo mảng `S` từ KSA)
- **Dữ liệu cần mã hóa**: "Hi" (H=72, i=105)
- Để đơn giản, giả định sau KSA, mảng `S` bắt đầu là: `[75, 145, 236, 3, 4, ..., 0, ..., 1, ..., 2, ..., 255]`

### Mã hóa byte đầu tiên: 'H' (72)
1. `i = (0 + 1) mod 256 = 1`
2. `j = (0 + S[1]) mod 256 = (0 + 145) mod 256 = 145`
3. Hoán đổi `S[1]=145` và `S[145]=1` → `S = [75, 1, 236, 3, 4, ..., 145, ..., 2, ..., 255]`
4. `k = (S[1] + S[145]) mod 256 = (1 + 145) mod 256 = 146`
5. Byte giả ngẫu nhiên: `S[146]` (giả sử `S[146] = 50`)
6. Mã hóa: `72 XOR 50 = 122`

### Mã hóa byte thứ hai: 'i' (105)
1. `i = (1 + 1) mod 256 = 2`
2. `j = (145 + S[2]) mod 256 = (145 + 236) mod 256 = 125`
3. Hoán đổi `S[2]=236` và `S[125]=125` → `S = [75, 1, 125, 3, 4, ..., 145, ..., 236, ..., 255]`
4. `k = (S[2] + S[125]) mod 256 = (125 + 236) mod 256 = 105`
5. Byte giả ngẫu nhiên: `S[105]` (giả sử `S[105] = 100`)
6. Mã hóa: `105 XOR 100 = 5`

Vậy, "Hi" được mã hóa thành `[122, 5]`.

---

## Giải mã với RC4

Do RC4 là thuật toán đối xứng và sử dụng phép XOR (có tính chất đảo ngược), quá trình giải mã giống hệt mã hóa. Chỉ cần áp dụng lại PRGA với cùng mảng `S` ban đầu và XOR với dữ liệu đã mã hóa:

- Byte đầu tiên: `122 XOR 50 = 72` (H)
- Byte thứ hai: `5 XOR 100 = 105` (i)

Kết quả: "Hi" được khôi phục.

---

## Đặc điểm của RC4

- **Đối xứng**: Mã hóa và giải mã dùng cùng quá trình.
- **Dòng**: Mã hóa từng byte, phù hợp với dữ liệu có độ dài bất kỳ.
- **Nhanh và đơn giản**: Dễ triển khai, nhưng cần quản lý khóa cẩn thận để tránh lỗ hổng bảo mật.

---

