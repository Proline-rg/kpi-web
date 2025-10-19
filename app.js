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

    // AIロジック（簡易版要約＋目標作成）
    const generatedDetail = `
【目標概要】
${title}に関する最近の動向やポイントを整理します。

${snippet}

【目標詳細】
${title}に関して、社内外の一般的な課題を踏まえ、定量的改善を目指す。
実現に向けて具体的な行動・スケジュールを定義する。
`;

    const generatedActions = `
【2か月ごとのアクションプラン】

📅 第1期（1～2か月目）:
- 現状分析を実施し、課題のリストアップを行う。
- 関係者ヒアリングや業務フローの可視化を進める。

📅 第2期（3～4か月目）:
- 改善案を実行。効果測定の仕組みを導入。
- チーム内共有・改善案の修正を実施。

📅 第3期（5～6か月目）:
- 成果を検証し、次期目標策定に反映。
- 成果報告資料を作成し、上層部へ報告。
`;

    detail.value = generatedDetail;
    action.value = generatedActions;
    status.textContent = "🎯 目標が自動生成されました。編集も可能です。";

  } catch (error) {
    console.error(error);
    status.textContent = "エラーが発生しました。もう一度お試しください。";
  }
});

