document.getElementById("generateBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const detail = document.getElementById("detail");
  const action = document.getElementById("action");
  const status = document.getElementById("status");

  if (!title) {
    alert("タイトルを入力してください。");
    return;
  }

  status.textContent = "AIが情報を検索・分析中です…（約10秒）";
  detail.value = "";
  action.value = "";

  try {
    // DuckDuckGo APIを使ってWeb検索
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(title)}&format=json&no_html=1`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(searchUrl)}`;
    const res = await fetch(proxyUrl);
    const res = await fetch(searchUrl);
    const data = await res.json();

    // 検索結果を要約
    const snippet = data.AbstractText || "関連情報が見つかりませんでした。";
// 🧠 改良版AIロジック（構造化・上司納得型）
const generatedDetail = `
【現状分析】
${title}に関しては、社内外で共通する課題として「非効率なプロセス」や「情報共有の遅れ」が挙げられます。
これらを解消し、成果を数値で可視化することが求められています。
${snippet ? `\n参考情報：${snippet}` : ''}

【目標詳細】
${title}において、半年後には具体的な成果（例：作業時間20%削減、顧客満足度＋10pt向上）を達成することを目指します。
現場の実態を踏まえ、上司・チーム双方が納得できる改善指針とします。

【アクションプラン】
📅 第1期（1〜2か月目）：
- 現状分析を行い、課題リストを作成。
- 優先度を定義し、改善対象を明確化する。

📅 第2期（3〜4か月目）：
- 改善施策を実行し、成果測定の仕組みを導入。
- 結果を共有し、継続改善に繋げる。

📅 第3期（5〜6か月目）：
- 成果を定量的に評価。
- 次期への改善案と学びを整理し、上司報告資料を作成。

【成果指標（KPI例）】
- 作業効率の改善率（目標：＋20%）
- 関連業務の処理時間削減（目標：▲10h/月）
- 関係部署からの満足度アンケート結果（目標：平均4.0以上）
`;

detail.value = generatedDetail;
action.value = "";
status.textContent = "🎯 上司納得型の目標が自動生成されました。編集も可能です。";




    detail.value = generatedDetail;
    action.value = generatedActions;
    status.textContent = "🎯 目標が自動生成されました。編集も可能です。";

  } catch (error) {
    console.error(error);
    status.textContent = "エラーが発生しました。もう一度お試しください。";
  }
});


