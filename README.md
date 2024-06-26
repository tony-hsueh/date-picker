# Date Range Calendar by React

此元件目前可接受 **showOnlyCurMonth** (布林值)，於瀏覽器可看到上方是不提供換月的日曆，下方提供換月。

第一個點擊的日期將作為起始時間。下一次點擊若等於或比起始日期晚將作為結束時間，反之則重新設定為起始時間。

## 安裝

Node.js 版本使用：20.11.1

### 取得專案

```bash
git clone https://github.com/tony-hsueh/date-picker.git
```

### 打開專案並安裝相關套件

```bash
npm install
```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5173/
```
## 資料夾說明

- src - 畫面放置處
 - assets - 圖片
- public - 靜態資源放置處

## 專案技術

- Node.js v20.11.1
- React v18.2.0
- Vite v5.2.0
- dayjs v1.11.10
- react-icons v5.0.1