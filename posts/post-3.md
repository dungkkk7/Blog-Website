Dưới đây là tài liệu đã được căn chỉnh và định dạng lại theo chuẩn markdown (file `.md`):

```markdown
# Cài Đặt và Cấu Hình Jadx

## 1. Cài Đặt Java

`jadx` yêu cầu Java để chạy. Đảm bảo rằng bạn đã cài đặt Java Development Kit (JDK) trên hệ thống của mình.

### Các bước cài đặt:

1. Mở Terminal và chạy các lệnh sau:
   sudo apt update
   sudo apt install openjdk-11-jdk
   

2. Kiểm tra phiên bản Java đã cài đặt:
   
   ```bash
   java -version
   ```

## 2. Tải Xuống và Cài Đặt Jadx

Bạn có thể tải xuống phiên bản mới nhất của `jadx` từ GitHub.

### Cách 1: Tải Xuống Từ GitHub

1. Tải xuống phiên bản mới nhất của `jadx`: Truy cập trang releases của `jadx` trên GitHub và tải xuống file `jadx-<version>.zip`. Ví dụ, bạn có thể sử dụng `wget` để tải xuống trực tiếp:

   ```bash
   mkdir -p ~/jadx
   cd ~/jadx
   wget https://github.com/skylot/jadx/releases/download/v1.4.4/jadx-1.4.4.zip
   ```

2. Giải nén file tải về: Cài đặt `unzip` nếu bạn chưa có:

   ```bash
   sudo apt install unzip
   ```

   Sau đó giải nén:

   ```bash
   unzip jadx-1.4.4.zip
   ```

3. Xóa file zip sau khi giải nén (tuỳ chọn):

   ```bash
   rm jadx-1.4.4.zip
   ```

### Kiểm Tra Cấu Trúc Thư Mục Jadx

Trước tiên, hãy đảm bảo rằng thư mục `bin` chứa các script thực thi của `jadx` nằm trực tiếp trong thư mục `~/jadx`. Bạn có thể kiểm tra bằng lệnh:

```bash
ls ~/jadx/bin
```

Kết quả nên liệt kê các tệp như `jadx`, `jadx-gui`, v.v.

## 3. Sửa Đổi File `~/.bashrc` Để Thêm Jadx Vào `PATH`

1. Mở file `~/.bashrc` bằng trình soạn thảo:

   ```bash
   nano ~/.bashrc
   ```

2. Thêm dòng sau vào cuối file:

   ```bash
   export PATH=$PATH:~/jadx/bin
   ```

   **Lưu ý**:
   - Đảm bảo rằng đường dẫn là `~/jadx/bin` chứ không phải `~/jadx/jadx/bin`, dựa trên cấu trúc thư mục bạn đã cung cấp.
   - Nếu bạn đã thêm một dòng tương tự trước đó, hãy sửa thành `~/jadx/bin` hoặc loại bỏ dòng cũ để tránh xung đột.

3. Lưu và thoát trình soạn thảo:
   - Nhấn `Ctrl + X`, sau đó nhấn `Y` và `Enter` để lưu thay đổi.

4. Áp dụng thay đổi `PATH`:

   ```bash
   source ~/.bashrc
   ```

## 4. Kiểm Tra Quyền Thực Thi Của Các Script Jadx

Đảm bảo rằng các tệp trong thư mục `bin` có quyền thực thi:

```bash
chmod +x ~/jadx/bin/jadx
chmod +x ~/jadx/bin/jadx-gui
```

## 5. Kiểm Tra Lại Cài Đặt `PATH`

Để xác nhận rằng `~/jadx/bin` đã được thêm vào `PATH`, bạn có thể chạy:

```bash
echo $PATH
```

Kiểm tra xem `~/jadx/bin` có nằm trong danh sách các đường dẫn hiển thị không.

## 6. Kiểm Tra Lệnh `jadx`

Bây giờ, hãy thử kiểm tra phiên bản của `jadx`:

```bash
jadx --version
```

Nếu mọi thứ đã được cấu hình đúng, bạn sẽ thấy thông tin phiên bản của `jadx` hiển thị trên Terminal.

---

## Câu Lệnh Cơ Bản của `JADX`

### 1. Decompile một APK hoặc DEX thành mã nguồn Java:

Nếu bạn có file APK hoặc DEX và muốn decompile nó thành mã Java, bạn sử dụng câu lệnh sau:

```bash
jadx -d output_folder your-app.apk
```

- `-d output_folder`: Thư mục để chứa kết quả decompiling (mã nguồn Java).
- `your-app.apk`: File APK hoặc DEX bạn muốn decompile.

**Ví dụ**:

```bash
jadx -d output_folder my-app.apk
```

### 2. Decompile một DEX file (classes.dex) thành Java:

Nếu bạn chỉ có một file DEX (ví dụ `classes.dex`), bạn có thể chạy:

```bash
jadx -d output_folder classes.dex
```

### 3. Decompile và chỉ định tên file đầu ra:

Bạn có thể chỉ định tên file đầu ra bằng cách sử dụng `-o` thay vì thư mục:

```bash
jadx -o output_file_name your-app.apk
```

### 4. Decompile với giao diện đồ họa (GUI):

Nếu bạn đã cài đặt `JADX GUI`, bạn có thể mở ứng dụng GUI để dễ dàng xem mã nguồn Java. Bạn chỉ cần chạy:

```bash
jadx-gui
```

Sau đó, mở file APK hoặc DEX mà bạn muốn decompile.

### 5. Decompile và hiển thị thông tin chi tiết:

Để xem thêm thông tin chi tiết về quá trình decompiling, bạn có thể sử dụng flag `-v` để kích hoạt chế độ verbose:

```bash
jadx -v -d output_folder your-app.apk
```

### 6. Decompile với cấu hình bộ giải nén tối ưu:

Nếu bạn muốn decompile và tối ưu hóa quá trình với các tùy chọn giải nén tốt hơn (chẳng hạn như tối ưu hóa mã lệnh), bạn có thể sử dụng các tùy chọn như `-j` cho bộ nhớ đa luồng:

```bash
jadx -d output_folder -j 4 your-app.apk
```

- `-j 4`: Sử dụng 4 luồng (threads) để tăng tốc quá trình decompile.

### 7. Tùy chọn decompile với một số phần hoặc bỏ qua các phần không cần thiết:

Nếu bạn chỉ muốn decompile một phần cụ thể của APK, bạn có thể chỉ định các phần như tài nguyên (res) hoặc smali code. Tuy nhiên, việc này có thể yêu cầu bạn phải cấu hình thêm một số tham số hoặc điều chỉnh thông qua GUI.

### 8. Chạy lệnh decompile trên nhiều file APK hoặc DEX:

Nếu bạn muốn decompile nhiều file APK hoặc DEX cùng một lúc, bạn có thể sử dụng một lệnh cho nhiều file:

```bash
for apk in *.apk; do
    jadx -d output_folder "$apk"
done
```

Lệnh này sẽ tìm tất cả các file `.apk` trong thư mục hiện tại và decompile chúng vào thư mục `output_folder`.

---

## Các Tùy Chọn Khác của `JADX`:

- `-d`: Chỉ định thư mục đầu ra.
- `-o`: Chỉ định tệp đầu ra (thay vì thư mục).
- `-v`: Hiển thị chi tiết quá trình decompiling.
- `-j`: Định cấu hình số luồng sử dụng khi decompile.
```


