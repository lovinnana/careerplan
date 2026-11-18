# 我的學習歷程素材庫（學生學習單）

高三選修課「學習歷程自述」使用的線上學習單。學生依序完成 Ikigai 回顧、高中三年故事、申請動機、讀書計畫與自我檢核，最後可以下載 Word 檔，或繳交給老師。

## 檔案說明

- `index.html`：學習單網頁本身（放到 GitHub Pages）
- `Code.gs`：收件程式，貼到 Google Apps Script，讓學生的繳交寫進 Google 試算表

## 一、放上 GitHub Pages

1. 登入 GitHub，按右上角「+」>「New repository」，取一個名稱（例如 `learning-portfolio`），選 **Public**，建立。
2. 在新的 repository 頁面按「Add file」>「Upload files」，把 `index.html` 拖進去，按「Commit changes」。
3. 到「Settings」>「Pages」，Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/ (root)`，按「Save」。
4. 等一兩分鐘，頁面上方會出現網址，例如 `https://你的帳號.github.io/learning-portfolio/`。這就是給學生的連結。

到這一步，學生已經可以填寫、下載 Word 檔、複製內容與列印。

## 二、開啟「繳交給老師」（選用）

1. 開一份新的 Google 試算表，命名為「學習歷程自述繳交」。
2. 點「擴充功能」>「Apps Script」，把編輯器裡原本的內容刪掉，貼上 `Code.gs` 的全部內容，按儲存。
3. 按右上角「部署」>「新增部署作業」，類型選「網頁應用程式」：
   - 執行身分：**我**
   - 誰可以存取：**所有人**
4. 按「部署」，第一次會要求授權，依畫面允許。完成後複製「網頁應用程式網址」（以 `https://script.google.com/macros/s/` 開頭）。
5. 回到 GitHub，打開 `index.html`，按鉛筆圖示編輯。找到最下方的：

   ```
   var SUBMIT_URL = "";
   ```

   把網址貼在引號中間，按「Commit changes」。
6. 一兩分鐘後重新整理學習單，第 6 步就會出現「繳交給老師」按鈕。學生的繳交會出現在試算表的「繳交」工作表，每位學生一列，各段落一欄。

### 注意事項

- 同一位學生（班級、座號、姓名都相同）再次繳交，會更新原本那一列，不會重複。
- 之後如果修改了 `Code.gs`，要在「部署」>「管理部署作業」中編輯並選「新版本」，網址才會套用新程式。
- 收件網址沒有密碼保護，請不要公開在學習單以外的地方。學生資料只存在你自己的 Google 試算表裡。
- 學生填寫的內容會暫存在各自裝置的瀏覽器中；換電腦或清除瀏覽紀錄會消失，請提醒學生下載 Word 檔或繳交。
