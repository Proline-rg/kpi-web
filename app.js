// app.js
const $ = id => document.getElementById(id);
const generateBtn = $("generateBtn");
const regenerateBtn = $("regenerateBtn");
const saveBtn = $("saveBtn");
const status = $("status");

generateBtn.addEventListener("click", () => generate(false));
regenerateBtn.addEventListener("click", () => generate(true));
saveBtn.addEventListener("click", saveToLocal);

// 疑似AIによる自動生成（ランダム＋テンプレート）
function generate(isRegenerate) {
  const role = $("role").value || "一般職";
  const duties = $("duties").value || "日常業務";
  const theme = $("theme").value || "業務改善";

  status.textContent = isRegenerate ? "新しい案を考えています…" : "生成中…";

  // 擬似的なAI出力（ChatGPTなし）
  const templates = [
    {
      title: `${theme}の推進による成果向上`,
      detail: `${role}として${duties}における${theme}を推進し、生産性と品質の両立を目指す。社内外の関係者と協力し、6か月で measurable な改善を実現する。`,
      plan: [
        "現状分析と課題抽出を実施し、改善テーマを明確化する。",
        "改善アイデアをチームで検討し、優先順位を設定する。",
        "小規模な改善施策を試行し、効果測定を行う。",
        "効果の高い施策を標準化し、業務プロセスに定着させる。",
        "定期的に成果をレビューし、次の課題を明確化する。",
        "最終報告として成果と改善提案をまとめ、共有会を実施する。"
      ]
    },
    {
      title: `チーム連携による${theme}の実現`,
      detail: `${duties}においてチームの協働力を高め、${theme}に直結する取り組みを展開する。定期的なフィードバックを通じて成果を最大化する。`,
      plan: [
        "チーム課題を洗い出し、協働の方向性を整理する。",
        "改善目標をチーム全員と共有し、実行計画を策定する。",
        "コミュニケーション活性化の施策を実施する。",
        "中間振り返りを実施し、アクションを修正する。",
        "成功事例を横展開し、組織知として蓄積する。",
        "最終レビューで改善効果を数値化し、次期目標へ反映する。"
      ]
    },
    {
      title: `${duties}における${theme}の強化`,
      detail: `${role}として、自主的に${duties}における${theme}を推進する。効率化・品質向上の両面で成果を出し、チーム全体への良い影響を与える。`,
      plan: [
        "業務フローを見直し、ボトルネックを特定する。",
        "改善アイデアを立案し、上司に提案する。",
        "承認された施策を試験的に導入する。",
        "成果を分析し、定量的に評価する。",
        "課題を再整理し、改善策を再実施する。",
        "最終的な成果報告とナレッジ共有を行う。"
      ]
    }
  ];

  // ランダムに案を選択
  const t = templates[Math.floor(Math.random() * templates.length)];
  applyToUI(t);

  status.textContent = "生成完了。内容は自由に編集できます。";
}

// 表示へ反映
function applyToUI(data) {
  $("title").value = data.title || "";
  $("detail").value = data.detail || "";
  const tbody = document.querySelector("#planTable tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.textContent = `${i + 1}月`;
    const ta = document.createElement("textarea");
    ta.rows = 2;
    ta.style.width = "100%";
    ta.value = data.plan[i] || "";
    td2.appendChild(ta);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
}

// 保存（ブラウザに記録）
function saveToLocal() {
  const data = {
    title: $("title").value,
    detail: $("detail").value,
    plan: [...document.querySelectorAll("#planTable tbody textarea")].map(t => t.value),
    savedAt: new Date().toISOString()
  };
  localStorage.setItem("kpiLocal", JSON.stringify(data));
  status.textContent = "ブラウザに保存しました。";
}

// ページ読み込み時に復元
window.addEventListener("load", () => {
  const saved = localStorage.getItem("kpiLocal");
  if (saved) {
    const data = JSON.parse(saved);
    applyToUI(data);
    status.textContent = "前回の内容を読み込みました。";
  }
});
// --- 具体化用データベース ---
const actionDetails = {
  "現状分析": "現在の業務フロー・ツール・担当範囲を棚卸しし、どの工程で時間・コスト・ミスが多発しているかを数値で可視化します。",
  "課題抽出": "分析結果をもとに、改善が必要な具体的な工程や業務負荷ポイントを特定します。",
  "改善施策": "既存の手順を簡略化したり、テンプレート・自動化を導入することで効率化します。",
  "効果測定": "改善施策の前後で業務時間・エラー数・顧客満足度を比較して成果を定量化します。",
  "標準化": "成功した改善施策をドキュメント化し、他のメンバーが再現できるよう共有します。",
  "レビュー": "月末または四半期単位で振り返りを行い、次期に向けた改善点を明確化します。"
};

// --- 表示へ反映（具体化追加版）---
function applyToUI(data) {
  $("title").value = data.title || "";
  $("detail").value = data.detail || "";
  const tbody = document.querySelector("#planTable tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.textContent = `${i + 1}月`;

    // アクション入力欄
    const ta = document.createElement("textarea");
    ta.rows = 2;
    ta.style.width = "100%";
    ta.value = data.plan[i] || "";

    // 具体説明（該当する語があれば）
    const explain = document.createElement("div");
    explain.style.fontSize = "0.85em";
    explain.style.color = "#555";
    for (const [key, value] of Object.entries(actionDetails)) {
      if (ta.value.includes(key)) {
        explain.textContent = "💡 " + value;
        break;
      }
    }

    td2.appendChild(ta);
    td3.appendChild(explain);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  }
}
