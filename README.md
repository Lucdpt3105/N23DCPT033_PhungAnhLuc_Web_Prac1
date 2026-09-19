# BÁO CÁO BUỔI THỰC HÀNH 1 (19/09/2026)

> **Môn học**: Thực hành Lập trình Web | **Nhóm**: Nhóm 2  
> **Repository**: [https://github.com/Lucdpt3105/N23DCPT033_PhungAnhLuc_Web_Prac1](https://github.com/Lucdpt3105/N23DCPT033_PhungAnhLuc_Web_Prac1)

---

## THÔNG TIN SINH VIÊN

| Họ và tên | Mã sinh viên | Lớp |
| :--- | :--- | :--- |
| **Phùng Anh Lực** | **`N23DCPT033`** | **`D23CQPTUD01-N`** |

---

##  KIẾN TRÚC HỆ THỐNG & LUỒNG CODE (ARCHITECTURE & FLOW)

Toàn bộ sơ đồ luồng dữ liệu, luồng hoạt động trang chủ / trang chi tiết, và cấu trúc component được thiết kế chi tiết bằng **Mermaid Diagrams** (tự động render trực quan trên GitHub):

 **[Sơ đồ Kiến trúc & Luồng Code (ARCHITECTURE.md)](./ARCHITECTURE.md)**

1. **Sơ đồ kiến trúc tổng quan** (Client ➔ Next.js App Router ➔ REST API).
2. **Sequence Diagram luồng trang chủ** (Server Component Fetching & Fallback).
3. **Sequence Diagram luồng trang chi tiết** (Dynamic Route `/blog/[id]`).
4. **Cây phân cấp Component UI** (`Layout`, `Header`, `BlogCard`, `Badge`, `Footer`).
5. **Quy trình làm giàu dữ liệu bài viết** (`lib/postUtils.js`).

---

## 🧩 THÀNH PHẦN CỐT LÕI (CORE COMPONENTS)

- **`components/Header.js`**: Masthead tòa soạn báo *The NEWS\**, ngày tháng thực tế, menu danh mục tin tức và nút tìm kiếm.
- **`components/Badge.js`**: Nhãn phân loại bài viết (Culture, Tech, World...) với các biến thể màu linh hoạt.
- **`components/BlogCard.js`**: Card hiển thị bài viết kèm ảnh thumbnail chất lượng cao, kẹp dòng tiêu đề (`line-clamp-2`), tóm tắt và nút xem chi tiết.
- **`app/page.js`**: Trang chủ tải dữ liệu từ server, hiển thị bài viết tiêu điểm (Hero Post) và hệ thống Grid Responsive:
  - Mobile (`< 640px`): `grid-cols-1` (1 cột).
  - Tablet (`≥ 640px`): `sm:grid-cols-2` (2 cột).
  - Desktop (`≥ 1024px`): `lg:grid-cols-3` (3 cột).
- **`app/blog/[id]/page.js`**: Trang đọc bài viết chi tiết, có trích dẫn báo chí, nút **"Back To Blog"** và danh sách bài viết liên quan.

---

## CHẠY DỰ ÁN CỤC BỘ (QUICK START)

```bash
# 1. Clone repository về máy
git clone https://github.com/Lucdpt3105/N23DCPT033_PhungAnhLuc_Web_Prac1.git

# 2. Di chuyển vào thư mục và cài đặt dependencies
cd N23DCPT033_PhungAnhLuc_Web_Prac1
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Truy cập trình duyệt tại: **[http://localhost:3000](http://localhost:3000)**.

---
<table>
  <tr>
    <th align="center">🏠 Trang chủ (Desktop)</th>
    <th align="center">📖 Chi tiết bài viết (<code>/blog/[id]</code>)</th>
    <th align="center">📱 Responsive (Mobile)</th>
  </tr>
  <tr valign="top">
    <td align="center" width="33%">
      <img src="screenshots/homepage.png" width="100%"/>
    </td>
    <td align="center" width="33%">
      <img src="screenshots/blog-detail.png" width="100%"/>
    </td>
    <td align="center" width="33%">
      <img src="screenshots/responsive.png" width="100%"/>
    </td>
  </tr>
</table>