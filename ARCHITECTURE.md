# So do luong code va kien truc du an

Tai lieu nay mo ta cach ung dung blog/editorial Next.js hoat dong dua tren code hien tai.

## 1. Tong quan kien truc

```mermaid
flowchart TB
    User["Nguoi dung / Browser"]

    subgraph NextApp["Next.js App Router"]
        Root["app/layout.js<br/>RootLayout"]
        Home["app/page.js<br/>HomePage - Server Component"]
        Detail["app/blog/[id]/page.js<br/>BlogDetailPage - Dynamic Route"]
    end

    subgraph UI["Reusable UI Components"]
        Header["components/Header.js"]
        Footer["components/Footer.js"]
        BlogCard["components/BlogCard.js"]
        Badge["components/Badge.js"]
    end

    subgraph DataLayer["Data & Mapping Layer"]
        Utils["lib/postUtils.js<br/>enrichPost(), fallback data"]
        Images["EDITORIAL_IMAGES"]
        Categories["CATEGORIES"]
        Authors["AUTHORS"]
    end

    subgraph External["External Services"]
        API["JSONPlaceholder API<br/>/posts, /posts/:id"]
        CDN["Unsplash image URLs"]
        Fonts["next/font/google"]
    end

    User -->|Request / or /blog/:id| NextApp
    Root --> Header
    Root --> Home
    Root --> Detail
    Root --> Footer

    Home -->|fetch posts| API
    Detail -->|fetch post by id| API
    Detail -->|fetch related posts| API

    Home --> Utils
    Detail --> Utils
    Utils --> Images
    Utils --> Categories
    Utils --> Authors
    Images --> CDN

    Home --> BlogCard
    Home --> Badge
    Detail --> BlogCard
    Detail --> Badge

    Header --> User
    Home --> User
    Detail --> User
    Footer --> User
    Fonts --> Root
```

## 2. Luong hoat dong trang chu

```mermaid
sequenceDiagram
    autonumber
    actor U as Nguoi dung
    participant B as Browser
    participant N as Next.js Server
    participant H as app/page.js
    participant API as JSONPlaceholder
    participant P as lib/postUtils.js
    participant C as Components

    U->>B: Mo trang /
    B->>N: GET /
    N->>H: Render HomePage()
    H->>API: fetch("https://jsonplaceholder.typicode.com/posts")

    alt API thanh cong
        API-->>H: Danh sach posts JSON
    else API loi / mat mang
        H->>P: Dung FALLBACK_POSTS
        P-->>H: Du lieu fallback
    end

    H->>P: rawPosts.map(enrichPost)
    P-->>H: Posts da them category, author, imageUrl, readTime, publishDate

    H->>H: Tach du lieu thanh heroPost, trendingPosts, mainGridPosts, techPosts
    H->>C: Render Badge, BlogCard, Link, image
    C-->>N: HTML giao dien
    N-->>B: Tra HTML da render
    B-->>U: Hien thi trang chu
```

## 3. Luong hoat dong trang chi tiet bai viet

```mermaid
sequenceDiagram
    autonumber
    actor U as Nguoi dung
    participant B as Browser
    participant N as Next.js Server
    participant D as app/blog/[id]/page.js
    participant API as JSONPlaceholder
    participant P as lib/postUtils.js
    participant C as Components

    U->>B: Bam bai viet /blog/:id
    B->>N: GET /blog/:id
    N->>D: Render BlogDetailPage({ params })
    D->>D: await params, lay id
    D->>API: fetch("/posts/:id")

    alt Tim thay bai viet
        API-->>D: Post JSON
    else API tra 404
        D->>N: notFound()
    else API loi / mat mang
        D->>P: Tim post trong FALLBACK_POSTS
        P-->>D: Fallback post hoac post mac dinh
    end

    D->>P: enrichPost(rawPost)
    P-->>D: Post da bo sung metadata
    D->>API: fetch("/posts") de lay related posts
    API-->>D: Danh sach posts lien quan
    D->>P: enrichPost(related posts)
    D->>C: Render Badge, BlogCard, Back link, article body
    C-->>N: HTML trang chi tiet
    N-->>B: Tra HTML da render
    B-->>U: Hien thi bai viet
```

## 4. Cay component hien tai

```mermaid
flowchart TD
    Layout["app/layout.js<br/>RootLayout"]
    Header["Header"]
    Main["main"]
    Footer["Footer"]
    Home["app/page.js<br/>HomePage"]
    Detail["app/blog/[id]/page.js<br/>BlogDetailPage"]
    Badge["Badge"]
    BlogCard["BlogCard"]
    Link["next/link"]
    ImageTag["img tags"]

    Layout --> Header
    Layout --> Main
    Layout --> Footer
    Main --> Home
    Main --> Detail

    Home --> Badge
    Home --> BlogCard
    Home --> Link
    Home --> ImageTag

    Detail --> Badge
    Detail --> BlogCard
    Detail --> Link
    Detail --> ImageTag

    BlogCard --> Badge
    BlogCard --> Link
    BlogCard --> ImageTag
```

## 5. Luong xu ly du lieu trong `enrichPost`

```mermaid
flowchart LR
    Raw["Raw post tu API<br/>{ userId, id, title, body }"]
    Index["Tinh index = id - 1"]
    Category["Lay category theo index % CATEGORIES.length"]
    Author["Lay author theo index % AUTHORS.length"]
    Image["Lay imageUrl theo index % EDITORIAL_IMAGES.length"]
    ReadTime["Tinh readTime tu post.id"]
    PublishDate["Gan publishDate co dinh"]
    Output["Post hoan chinh<br/>title, body, category, categoryColor,<br/>author, imageUrl, readTime, publishDate"]

    Raw --> Index
    Index --> Category
    Index --> Author
    Index --> Image
    Raw --> ReadTime
    Raw --> PublishDate
    Category --> Output
    Author --> Output
    Image --> Output
    ReadTime --> Output
    PublishDate --> Output
```

## 6. Tom tat vai tro tung file

| File | Vai tro |
| --- | --- |
| `app/layout.js` | Layout goc, nap font, boc Header - main - Footer. |
| `app/page.js` | Trang chu, fetch danh sach posts, enrich du lieu, render hero/trending/grid/technology. |
| `app/blog/[id]/page.js` | Trang chi tiet bai viet, fetch post theo id, xu ly 404/fallback, render bai viet va related posts. |
| `lib/postUtils.js` | Chua du lieu anh/category/author fallback va ham `enrichPost`. |
| `components/Header.js` | Thanh masthead, menu danh muc, nut search. |
| `components/BlogCard.js` | Card bai viet tai su dung tren trang chu va related posts. |
| `components/Badge.js` | Badge category/author voi mau theo bien `color`. |
| `components/Footer.js` | Chan trang va cac lien ket thong tin. |
