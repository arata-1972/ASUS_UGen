# Taiwanese Speech Bridge｜台語・華語雙向語音溝通

ASUS UGen AI League 2026 · Stage I · v6

## 用途

讓說台語的來訪者與說華語的接待人員，逐句確認並理解對方的意思。流程是選擇語言、上傳WAV、語音辨識、確認或修改原文、翻譯、確認或修改譯文，再合成音訊播放。沒有LLM、任務卡、摘要或自動執行工作。

## 已完成的原型與實測範圍

Node.js本機介面與CLI已實作，12項協定與失敗處理測試通過。現行版本使用既有自架ASR、EOLE翻譯與TTS服務；介面在本機執行，不表示模型推論在本機或ASUS裝置執行。

使用自家合成音訊的單次連接測試：華語→台語已取得辨識、翻譯與生成音訊；第一次音訊下載因未設定音訊來源而停止，之後回收既生成音訊。該台語音訊→華語的完整API流程完成，客戶端經過時間7,069.29毫秒。辨識有誤且影響翻譯，這不是準確率、真人對話品質或硬體效能結果。原始結果保留，沒有改成預期答案。

瀏覽器可檢查與編輯原文、譯文；CLI測量不會停下等待人工確認。兩者的證據分開記錄。WAV上傳已實作，麥克風錄音尚未實作。

另一次接待示範使用新合成台語問句。實ASR約803毫秒，回傳「請問服務代到位去。」；操作者明示修正為「請問服務台佇佗位？」後，實翻譯約189毫秒，華語TTS約1,147毫秒，瀏覽器顯示實際播放。這些單次API時間不包含人工修正時間，也不是UGen效能。瀏覽器下載存檔尚未驗證。

## UGen部署計畫

暫定選擇Thunderstorm，規劃在指定Intel Arc Pro B70/OpenVINO環境先驗證ASR部署。B70為32GB官方產品。自家模型相容性、匯出、實際GPU執行、記憶體和CPU/GPU比較尚待驗證。目前UGen300/Hailo、B70/OpenVINO執行均未完成；不會把遠端HTTP結果當成裝置推論。翻譯和TTS可先維持既有服務，後續分別評估裝置相容性。

## 執行與文件

- [新應用程式及設定](implementation/README.md)
- [程式架構](implementation/ARCHITECTURE.md)
- [測量方法、原始證據與限制](implementation/BENCHMARK.md)
- [示範操作](implementation/DEMO.md)
- [繁體中文提案PDF](proposals/proposal_zh-TW_v6.pdf)
- [繁體中文提案PowerPoint](proposals/proposal_zh-TW_v6.pptx)
- [提案全文](proposals/proposal_text_zh-TW_v6.md)
- [架構圖](architecture/architecture_zh-TW_v6.pdf)
- [影片腳本](demo/demo_script_zh-TW_v6.md)
- [繁體中文字幕](demo/demo_zh-TW_v6.srt)

## 背景技術與權利範圍

Taigi AI Labs既有語音辨識、翻譯、語音合成與語言判定為參賽前的背景技術。此儲存庫公開新應用程式的串接邏輯、介面與展示文件，不包含既有服務後端程式、模型權重、訓練資料、金鑰或顧客錄音。設定範例使用本機占位網址，實際網址與認證由使用者自行安全設定。未對模型或資料新增再散布授權，未自行新增授權文件。

## 版本與提交狀態

v6為目前最新Speech Bridge原型。v3至v5保留作為先前任務卡構想的歷史文件，不是現行應用。日文全文對譯保留於團隊本地，未上傳此儲存庫。尚未送出參賽表單。

官方競賽：https://contest.bhuntr.com/en/39jg9vimiynrhlksze/home/

GitHub：https://github.com/arata-1972/ASUS_UGen

## 實際操作畫面展示影片

[YouTube 不公開列出｜v6](https://youtu.be/KMAJUB4vhRY)

142.76秒，實際操作畫面的截圖剪輯，全編使用Taigi華語TTS旁白。不是連續螢幕錄影。中國語（台灣）CC字幕對應旁白，另附SRT。合成試驗輸入、ASR誤認與人工修正清楚區分；目前自家伺服器API執行，UGen尚未整合。
